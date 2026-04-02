const background = require('../../src/features/common/prompts/prepMaterial/background');
const hebbia = require('../../src/features/common/prompts/prepMaterial/hebbia');
const { getDefaultPromptPresets } = require('../../src/features/common/prompts/defaultPresets');

const TAVUS_API_BASE_URL = 'https://tavusapi.com/v2';
const DEFAULT_REPLICA_ID = process.env.TAVUS_REPLICA_ID || 'rf4e9d9790f0';
const DEFAULT_MODE = 'final-round';
const ZAYD_PRESET_ID = 'hebbia-zayd-mock-interview';
const AVAILABLE_MODES = [
    'rapid-fire',
    'behavioral-only',
    'customer-simulation',
    'final-round',
];

function getModeInstruction(mode) {
    switch (mode) {
        case 'rapid-fire':
            return 'Keep the pace high. Ask shorter questions, cut long answers off politely, and give lighter feedback.';
        case 'behavioral-only':
            return 'Focus on experience, stakeholder handling, conflict, ambiguity, and executive communication. Avoid technical deep dives unless needed.';
        case 'customer-simulation':
            return 'Act like a skeptical bank or private-credit stakeholder evaluating whether Cheney can help your team adopt Matrix.';
        case 'final-round':
        default:
            return 'Run a tougher, more strategic, more skeptical final-round interview with enterprise standards.';
    }
}

function getZaydPrompt() {
    const preset = getDefaultPromptPresets().find((item) => item.id === ZAYD_PRESET_ID);
    if (!preset) {
        throw new Error(`Missing preset: ${ZAYD_PRESET_ID}`);
    }
    return preset.prompt;
}

function buildPersonaPrompt(mode, replicaId) {
    const experiences = background.experience
        .map((item) => `${item.role} at ${item.company} (${item.period})`)
        .join('; ');

    return [
        'You are conducting a live spoken mock interview over Tavus.',
        getZaydPrompt(),
        '',
        'Candidate background:',
        `- Name: ${background.name}`,
        `- Pitch: ${background.pitch}`,
        `- Experience: ${experiences}`,
        `- Education: ${background.resume.education}`,
        `- Languages: ${background.resume.languages}`,
        '',
        'Hebbia context:',
        `- Role: ${hebbia.role}`,
        `- Company profile: ${hebbia.companyProfile}`,
        `- Role details: ${hebbia.roleDetails}`,
        `- Why Hebbia: ${hebbia.whyThisCompany}`,
        `- Zayd likely questions: ${hebbia.interviewPrep.zaydLikelyQuestions}`,
        `- Zayd-tailored answer standards: ${hebbia.interviewPrep.zaydTailoredAnswers}`,
        '',
        'Mode for this session:',
        `- ${getModeInstruction(mode)}`,
        '',
        'Live conversation rules:',
        '- Speak naturally and keep turns concise.',
        '- Start with a one-sentence opener and then immediately ask the first question.',
        '- Ask one question at a time.',
        '- If the answer is vague, push for specifics, metrics, tradeoffs, and enterprise realism.',
        '- If the candidate explicitly asks for feedback, give concise feedback and then continue the interview.',
        '- Do not describe yourself as reading from a prompt or internal notes.',
        `- Use replica-aware pacing suitable for Tavus realtime conversation with replica ${replicaId}.`,
    ].join('\n');
}

function buildConversationPayload({ personaId, replicaId, mode, audioOnly, testMode }) {
    const timestamp = new Date().toISOString();
    const payload = {
        persona_id: personaId,
        replica_id: replicaId,
        conversation_name: `Hebbia Mock Interview (Zayd) ${timestamp}`,
        conversational_context: [
            `Run a ${mode} mock interview for Hebbia's AI Strategist role.`,
            'Focus on enterprise trust, data quality, workflow realism, customer adoption, and finance-specific AI failure modes.',
            'Push especially hard on the first 30 days after signing, skeptical stakeholder trust, and what should remain human versus automated.',
        ].join(' '),
        custom_greeting: "Let's do a Zayd-style Hebbia mock. Keep answers concise. First question: why Hebbia, and why this role now?",
        max_participants: 2,
    };

    if (audioOnly) {
        payload.audio_only = true;
    }
    if (testMode) {
        payload.test_mode = true;
    }

    return payload;
}

async function tavusRequest(path, apiKey, body) {
    const response = await fetch(`${TAVUS_API_BASE_URL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        },
        body: JSON.stringify(body),
    });

    const text = await response.text();
    let data;
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = { raw: text };
    }

    if (!response.ok) {
        const detail = typeof data === 'object' ? JSON.stringify(data) : String(data);
        throw new Error(`Tavus ${path} failed with HTTP ${response.status}: ${detail}`);
    }

    return data;
}

async function ensurePersona(apiKey, options) {
    if (options.personaId) {
        return {
            personaId: options.personaId,
            created: false,
        };
    }

    const persona = await tavusRequest('/personas', apiKey, {
        persona_name: 'Hebbia Zayd Mock Interviewer',
        pipeline_mode: 'full',
        system_prompt: buildPersonaPrompt(options.mode, options.replicaId),
        default_replica_id: options.replicaId,
    });

    return {
        personaId: persona.persona_id,
        created: true,
    };
}

function normalizeOptions(options = {}) {
    const mode = AVAILABLE_MODES.includes(options.mode) ? options.mode : DEFAULT_MODE;

    return {
        audioOnly: options.audioOnly !== false,
        testMode: Boolean(options.testMode),
        mode,
        personaId: options.personaId || process.env.TAVUS_HEBBIA_ZAYD_PERSONA_ID || '',
        replicaId: options.replicaId || DEFAULT_REPLICA_ID,
    };
}

async function createMockConversation(rawOptions = {}) {
    const apiKey = rawOptions.apiKey || process.env.TAVUS_API_KEY;
    if (!apiKey) {
        throw new Error('Missing TAVUS_API_KEY in .env');
    }

    const options = normalizeOptions(rawOptions);
    const persona = await ensurePersona(apiKey, options);
    const conversation = await tavusRequest(
        '/conversations',
        apiKey,
        buildConversationPayload({
            personaId: persona.personaId,
            replicaId: options.replicaId,
            mode: options.mode,
            audioOnly: options.audioOnly,
            testMode: options.testMode,
        }),
    );

    return {
        options,
        personaId: persona.personaId,
        personaCreated: persona.created,
        conversation,
    };
}

function getClientConfig() {
    return {
        modes: AVAILABLE_MODES,
        defaultMode: DEFAULT_MODE,
        defaultAudioOnly: true,
        hasSavedPersona: Boolean(process.env.TAVUS_HEBBIA_ZAYD_PERSONA_ID),
        replicaId: DEFAULT_REPLICA_ID,
    };
}

module.exports = {
    AVAILABLE_MODES,
    DEFAULT_MODE,
    DEFAULT_REPLICA_ID,
    createMockConversation,
    getClientConfig,
    normalizeOptions,
};

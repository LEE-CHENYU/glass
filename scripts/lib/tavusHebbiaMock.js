const background = require('../../src/features/common/prompts/prepMaterial/background');
const hebbia = require('../../src/features/common/prompts/prepMaterial/hebbia');

const TAVUS_API_BASE_URL = 'https://tavusapi.com/v2';
const DEFAULT_REPLICA_ID = process.env.TAVUS_REPLICA_ID || 'rf4e9d9790f0';
const DEFAULT_MODE = 'final-round';
const DEFAULT_PERSONA_VERSION = '2026-04-02-hebbia-se-matrix-v2';
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
    return `You are simulating a Hebbia interviewer in the style of Zayd Sukhun.

Use this public-background signal for the simulation:
- long career in banking, financial-crime, sanctions, and compliance-adjacent solutions work
- solutions engineering and enterprise client leadership for financial institutions
- likely bias toward real workflows, dirty data, implementation detail, trust, and measurable customer value

Your job is to run a demanding mock interview for Cheney Li for Hebbia's Solutions Engineer role.

Core product lens you should evaluate against:
- Matrix is best understood as a spreadsheet where each cell is an AI query over documents
- rows are documents, companies, deals, credit agreements, or properties
- columns are the repeated questions the analyst or lawyer wants answered
- each cell returns a structured answer with a citation to the exact source passage
- the value is not "chat with PDFs"; it is structured, repeatable, multi-document analysis with verification

Recurring use cases to pressure-test:
- deal screening
- due diligence and data-room review
- earnings analysis across many companies
- contract review and clause comparison

What to emphasize:
- whether Cheney sounds credible to banking, private credit, and regulated-finance buyers
- whether he understands enterprise adoption, not just LLM demos
- whether he can explain Matrix clearly using customer workflow language rather than abstract AI language
- whether he can map a messy workflow, find the highest-leverage insertion point, and prove value fast
- whether he understands where AI systems break in real finance environments: stale data, unlabeled fields, auditability gaps, and weak validation
- whether he can handle skeptical stakeholders who care about risk, trust, and rollout discipline

Use these question patterns heavily:
- "What is Matrix, in practical terms, to a client?"
- "How would you explain Matrix without sounding like generic AI search?"
- "How would you configure rows, columns, prompts, and source docs for a real client workflow?"
- "How would you get a skeptical bank or private-credit team to trust Matrix?"
- "Where do LLM workflows fail in finance, and how would you catch those failures?"
- "How would you prove value in the first 30 days of an evaluation or POC?"
- "What exact part of the analyst workflow would you automate first, and what would you leave human?"
- "How would you handle dirty data, stale fields, unlabeled currency, or inconsistent entity mapping?"
- "How do you take a generic platform and make it look like the client's exact deliverable?"
- "Why are you a better fit than someone with more traditional enterprise SE years?"

Coach toward answer quality that sounds like this:
- strong product explanations start with the spreadsheet/cell metaphor, then move to why citations and structure matter
- the best SE answers start from the client's current deliverable, then map it into Matrix rows, columns, prompts, and source documents
- trust comes from validating against a completed client workflow they already know, with side-by-side outputs and citations
- finance AI failures are often data-pipeline failures, not just model failures
- strong answers should reference PDD RMB labeling, stale SNVXX yield data, and >2 percent validation thresholds when relevant
- first-win strategy should focus on one painful extraction/comparison workflow, measured on time saved, reviewer trust, and error reduction
- extraction, structuring, comparison, and citation can be automated first; final investment/legal judgment and exception handling stay human
- Compliance OS is a strong proof point for deterministic-rules-first, source-grounded, document-centric workflows and is especially relevant for Zayd's compliance background

How to run the mock interview:
- Ask one question at a time
- Start with a short opener and go directly into the first question
- Favor questions about customer discovery, workflow mapping, demo design, POC execution, stakeholder management, data quality, implementation realism, and finance/compliance workflow pain
- Use realistic follow-ups if the answer is vague, too high-level, or sounds like startup hype
- Push for specific examples, numbers, tradeoffs, and customer-facing language
- Periodically ask questions like:
  - "What is Matrix to a client in one sentence?"
  - "If I gave you 200 credit agreements, how would Matrix structure the work?"
  - "How would you get a skeptical bank team to trust Matrix?"
  - "Where do LLM workflows fail in finance, and how do you handle that?"
  - "How would you prove value in the first 30 days of a POC?"
  - "What part of an analyst workflow would you automate first, and what would you leave human?"
  - "How would you configure Matrix to match the client's existing output?"
  - "Why are you a better fit for this than someone with more classic SE tenure?"

After each answer:
- Give a short score out of 5 for credibility, specificity, and client readiness
- Point out the biggest weakness
- Offer a tighter answer in ready-to-say language
- Then ask the next question

Tone:
- direct, skeptical, professional
- enterprise-oriented, not theatrical
- pressure-test weak answers without becoming hostile

If the user asks for a mode, adapt:
- "rapid fire" = quicker questions, lighter feedback
- "behavioral only" = experience and stakeholder-management questions only
- "customer simulation" = act like a bank or private credit client evaluating whether Cheney can help their team
- "final round" = tougher, more skeptical, more strategic

End only when the user says they are done, then summarize the top 3 fixes needed before the actual Hebbia interview.`;
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
        `- Matrix mental model: ${hebbia.interviewPrep.matrixMentalModel}`,
        `- Recurring use cases: ${hebbia.interviewPrep.recurringUseCases}`,
        `- What the SE actually does: ${hebbia.interviewPrep.whatSeActuallyDoes}`,
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
            `Run a ${mode} mock interview for Hebbia's Solutions Engineer role.`,
            'Lead with Matrix as a spreadsheet where each cell is an AI query over documents, with structured outputs and citations.',
            'Focus on workflow mapping, demo design, POC realism, enterprise trust, data quality, and finance-specific AI failure modes.',
            'Push especially hard on customer deliverables, rows and columns setup, skeptical stakeholder trust, and what should remain human versus automated.',
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
        persona_name: `Hebbia Zayd Mock Interviewer (${DEFAULT_PERSONA_VERSION})`,
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
    const savedPersonaVersion = process.env.TAVUS_HEBBIA_ZAYD_PERSONA_VERSION || '';
    const savedPersonaId = process.env.TAVUS_HEBBIA_ZAYD_PERSONA_ID || '';
    const hasCompatibleSavedPersona = Boolean(savedPersonaId) && savedPersonaVersion === DEFAULT_PERSONA_VERSION;

    return {
        audioOnly: options.audioOnly !== false,
        forceNewPersona: Boolean(options.forceNewPersona),
        testMode: Boolean(options.testMode),
        mode,
        personaId: options.personaId || (options.forceNewPersona ? '' : (hasCompatibleSavedPersona ? savedPersonaId : '')),
        personaVersion: DEFAULT_PERSONA_VERSION,
        savedPersonaVersion,
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
    const savedPersonaVersion = process.env.TAVUS_HEBBIA_ZAYD_PERSONA_VERSION || '';
    const hasSavedPersona = Boolean(process.env.TAVUS_HEBBIA_ZAYD_PERSONA_ID) && savedPersonaVersion === DEFAULT_PERSONA_VERSION;

    return {
        modes: AVAILABLE_MODES,
        defaultMode: DEFAULT_MODE,
        defaultAudioOnly: true,
        hasSavedPersona,
        personaVersion: DEFAULT_PERSONA_VERSION,
        savedPersonaVersion,
        replicaId: DEFAULT_REPLICA_ID,
    };
}

module.exports = {
    AVAILABLE_MODES,
    DEFAULT_MODE,
    DEFAULT_PERSONA_VERSION,
    DEFAULT_REPLICA_ID,
    createMockConversation,
    getClientConfig,
    normalizeOptions,
};

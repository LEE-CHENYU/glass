#!/usr/bin/env node

require('dotenv').config();

const { execFileSync } = require('child_process');
const {
    AVAILABLE_MODES,
    createMockConversation,
    DEFAULT_MODE,
    DEFAULT_PERSONA_VERSION,
    DEFAULT_REPLICA_ID,
} = require('./lib/tavusHebbiaMock');

function parseArgs(argv) {
    const options = {
        audioOnly: true,
        mode: DEFAULT_MODE,
        open: false,
        testMode: false,
        forceNewPersona: false,
        personaId: '',
        replicaId: DEFAULT_REPLICA_ID,
    };

    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '--open') {
            options.open = true;
        } else if (arg === '--test') {
            options.testMode = true;
        } else if (arg === '--refresh-persona') {
            options.forceNewPersona = true;
            options.personaId = '';
        } else if (arg === '--video') {
            options.audioOnly = false;
        } else if (arg === '--audio-only') {
            options.audioOnly = true;
        } else if (arg === '--mode' && argv[i + 1]) {
            options.mode = argv[i + 1];
            i += 1;
        } else if (arg === '--persona-id' && argv[i + 1]) {
            options.personaId = argv[i + 1];
            i += 1;
        } else if (arg === '--replica-id' && argv[i + 1]) {
            options.replicaId = argv[i + 1];
            i += 1;
        } else if (arg === '--help' || arg === '-h') {
            printHelp();
            process.exit(0);
        }
    }

    return options;
}

function printHelp() {
    console.log(`Usage: node scripts/start-tavus-hebbia.js [options]

Options:
  --mode <name>         ${AVAILABLE_MODES.join(' | ')}
  --video               Create a video conversation instead of audio-only
  --audio-only          Force audio-only mode (default)
  --open                Open the returned conversation URL in the browser
  --test                Create a Tavus test conversation without incurring call cost
  --refresh-persona     Ignore the saved persona and create a fresh one from the current prompt
  --persona-id <id>     Reuse an existing Tavus persona instead of creating a new one
  --replica-id <id>     Override the Tavus replica to use
  --help                Show this help text

Environment:
  TAVUS_API_KEY
  TAVUS_REPLICA_ID
  TAVUS_HEBBIA_ZAYD_PERSONA_ID
  TAVUS_HEBBIA_ZAYD_PERSONA_VERSION=current ${DEFAULT_PERSONA_VERSION}`);
}

function openUrl(url) {
    try {
        execFileSync('open', [url], { stdio: 'ignore' });
    } catch (error) {
        console.error(`Failed to open browser automatically: ${error.message}`);
    }
}

async function main() {
    const options = parseArgs(process.argv.slice(2));
    const result = await createMockConversation(options);

    console.log(`Persona ID: ${result.personaId}${result.personaCreated ? ' (new)' : ' (reused)'}`);
    if (result.personaCreated) {
        console.log(`Tip: add TAVUS_HEBBIA_ZAYD_PERSONA_ID=${result.personaId} and TAVUS_HEBBIA_ZAYD_PERSONA_VERSION=${DEFAULT_PERSONA_VERSION} to .env to reuse this persona later.`);
    }
    console.log(`Conversation ID: ${result.conversation.conversation_id}`);
    console.log(`Conversation URL: ${result.conversation.conversation_url}`);
    console.log(`Status: ${result.conversation.status}`);
    if (result.conversation.meeting_token) {
        console.log('Meeting token returned.');
    }

    if (options.open && !options.testMode) {
        openUrl(result.conversation.conversation_url);
        console.log('Opened in browser.');
    }
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});

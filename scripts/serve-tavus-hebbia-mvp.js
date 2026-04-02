#!/usr/bin/env node

require('dotenv').config();

const path = require('path');
const { execFileSync } = require('child_process');
const express = require('express');
const { createMockConversation, getClientConfig } = require('./lib/tavusHebbiaMock');

const DEFAULT_PORT = Number(process.env.TAVUS_HEBBIA_MVP_PORT || 4318);

function parseArgs(argv) {
    const options = {
        open: false,
        port: DEFAULT_PORT,
    };

    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '--open') {
            options.open = true;
        } else if (arg === '--port' && argv[i + 1]) {
            const port = Number(argv[i + 1]);
            if (!Number.isNaN(port) && port > 0) {
                options.port = port;
            }
            i += 1;
        } else if (arg === '--help' || arg === '-h') {
            printHelp();
            process.exit(0);
        }
    }

    return options;
}

function printHelp() {
    console.log(`Usage: node scripts/serve-tavus-hebbia-mvp.js [options]

Options:
  --open         Open the local MVP page in the browser
  --port <num>   Override the local server port (default: ${DEFAULT_PORT})
  --help         Show this help text`);
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
    const app = express();
    const staticDir = path.join(__dirname, '..', 'tools', 'tavus-hebbia-mvp');

    app.use(express.json());
    app.use(express.static(staticDir));

    app.get('/api/health', (_req, res) => {
        res.json({
            ok: true,
            hasApiKey: Boolean(process.env.TAVUS_API_KEY),
        });
    });

    app.get('/api/config', (_req, res) => {
        res.json(getClientConfig());
    });

    app.post('/api/start', async (req, res) => {
        try {
            const { mode, audioOnly, testMode } = req.body || {};
            const result = await createMockConversation({ mode, audioOnly, testMode });

            res.json({
                ok: true,
                personaId: result.personaId,
                personaCreated: result.personaCreated,
                conversationId: result.conversation.conversation_id,
                conversationUrl: result.conversation.conversation_url,
                status: result.conversation.status,
                testMode: result.options.testMode,
                audioOnly: result.options.audioOnly,
                mode: result.options.mode,
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                error: error.message,
            });
        }
    });

    app.get('*', (_req, res) => {
        res.sendFile(path.join(staticDir, 'index.html'));
    });

    app.listen(options.port, () => {
        const url = `http://127.0.0.1:${options.port}`;
        console.log(`Tavus Hebbia MVP listening on ${url}`);
        if (options.open) {
            openUrl(url);
        }
    });
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});

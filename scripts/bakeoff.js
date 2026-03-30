#!/usr/bin/env node
/**
 * Tars LLM Bakeoff — tests all cloud providers with the same interview transcript
 * Usage: node scripts/bakeoff.js
 */

require('dotenv').config();
const { getSystemPrompt } = require('../src/features/common/prompts/promptBuilder');
const { createLLM } = require('../src/features/common/ai/factory');

// Sample Hebbia interview transcript
const sampleTranscript = `them: Thanks for joining us today. So tell me, how do LLMs actually work for financial research? What's your take on that?`;

const profile = 'hebbia';
const systemPrompt = getSystemPrompt(profile, sampleTranscript, false);

const providers = [
    {
        name: 'Anthropic (Claude Sonnet 4.6)',
        provider: 'anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: 'claude-sonnet-4-6',
    },
    {
        name: 'OpenAI (GPT-5.4)',
        provider: 'openai',
        apiKey: process.env.OPENAI_API_KEY,
        model: 'gpt-5.4',
    },
    {
        name: 'Gemini (Gemini 3 Flash Preview)',
        provider: 'gemini',
        apiKey: process.env.GEMINI_API_KEY,
        model: 'gemini-3-flash-preview',
    },
];

async function runProvider(config) {
    const start = Date.now();
    try {
        const llm = createLLM(config.provider, {
            apiKey: config.apiKey,
            model: config.model,
            temperature: 0.7,
            maxTokens: 1024,
        });

        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `The interviewer just asked: "${sampleTranscript.split(': ').slice(1).join(': ')}"` },
        ];

        const result = await llm.chat(messages);
        const latency = Date.now() - start;
        return { name: config.name, response: result.content, latency, error: null };
    } catch (err) {
        const latency = Date.now() - start;
        return { name: config.name, response: null, latency, error: err.message };
    }
}

async function main() {
    console.log('='.repeat(80));
    console.log('TARS LLM BAKEOFF — Hebbia Interview Coaching');
    console.log('='.repeat(80));
    console.log(`\nTranscript: "${sampleTranscript}"`);
    console.log(`System prompt length: ${systemPrompt.length} chars`);
    console.log(`\nRunning all 3 providers in parallel...\n`);

    const results = await Promise.all(providers.map(runProvider));

    for (const r of results) {
        console.log('='.repeat(80));
        console.log(`${r.name} — ${r.latency}ms`);
        console.log('-'.repeat(80));
        if (r.error) {
            console.log(`ERROR: ${r.error}`);
        } else {
            console.log(r.response);
        }
        console.log();
    }

    console.log('='.repeat(80));
    console.log('LATENCY SUMMARY:');
    for (const r of results) {
        const status = r.error ? 'FAILED' : `${r.latency}ms`;
        console.log(`  ${r.name}: ${status}`);
    }
    console.log('='.repeat(80));
}

main().catch(console.error);

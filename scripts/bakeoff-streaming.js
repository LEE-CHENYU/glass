#!/usr/bin/env node
/**
 * Tars Streaming Bakeoff — measures time-to-first-token (TTFT)
 * This is what matters for real-time coaching: how fast do you see the first line?
 */

require('dotenv').config();
const { getSystemPrompt } = require('../src/features/common/prompts/promptBuilder');
const { createStreamingLLM } = require('../src/features/common/ai/factory');

const sampleTranscript = `them: Thanks for joining us today. So tell me, how do LLMs actually work for financial research? What's your take on that?`;
const systemPrompt = getSystemPrompt('hebbia', sampleTranscript, false);

const providers = [
    { name: 'Anthropic (Claude Sonnet 4.6)', provider: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY, model: 'claude-sonnet-4-6' },
    { name: 'Anthropic (Claude Haiku 4.5)', provider: 'anthropic', apiKey: process.env.ANTHROPIC_API_KEY, model: 'claude-haiku-4-5-20251001' },
    { name: 'OpenAI (GPT-5.4)', provider: 'openai', apiKey: process.env.OPENAI_API_KEY, model: 'gpt-5.4' },
    { name: 'OpenAI (GPT-5.4 Mini)', provider: 'openai', apiKey: process.env.OPENAI_API_KEY, model: 'gpt-5.4-mini' },
    { name: 'Gemini (Gemini 3 Flash)', provider: 'gemini', apiKey: process.env.GEMINI_API_KEY, model: 'gemini-3-flash-preview' },
];

async function runStreaming(config) {
    const start = Date.now();
    let ttft = null;
    let fullResponse = '';
    let tokenCount = 0;

    try {
        const llm = createStreamingLLM(config.provider, {
            apiKey: config.apiKey,
            model: config.model,
            temperature: 0.7,
            maxTokens: 1024,
        });

        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `The interviewer just asked: "${sampleTranscript.split(': ').slice(1).join(': ')}"` },
        ];

        const response = await llm.streamChat(messages);
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(l => l.trim());

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.substring(6);
                    if (data === '[DONE]') continue;
                    try {
                        const json = JSON.parse(data);
                        const token = json.choices[0]?.delta?.content || '';
                        if (token) {
                            tokenCount++;
                            fullResponse += token;
                            if (!ttft) {
                                ttft = Date.now() - start;
                            }
                        }
                    } catch {}
                }
            }
        }

        const totalTime = Date.now() - start;
        return { name: config.name, ttft, totalTime, tokenCount, firstLine: fullResponse.split('\n')[0], error: null };
    } catch (err) {
        return { name: config.name, ttft: null, totalTime: Date.now() - start, tokenCount: 0, firstLine: '', error: err.message };
    }
}

async function main() {
    console.log('='.repeat(80));
    console.log('TARS STREAMING BAKEOFF — Time-to-First-Token');
    console.log('='.repeat(80));
    console.log(`\nWhat matters: how fast can you START reading?\n`);

    const results = await Promise.all(providers.map(runStreaming));

    for (const r of results) {
        console.log('-'.repeat(80));
        if (r.error) {
            console.log(`${r.name}: ERROR — ${r.error}`);
        } else {
            console.log(`${r.name}:`);
            console.log(`  Time-to-first-token: ${r.ttft}ms`);
            console.log(`  Total time:          ${r.totalTime}ms`);
            console.log(`  Tokens streamed:     ${r.tokenCount}`);
            console.log(`  First line:          ${r.firstLine}`);
        }
    }

    console.log('\n' + '='.repeat(80));
    console.log('VERDICT:');
    const sorted = results.filter(r => !r.error).sort((a, b) => a.ttft - b.ttft);
    for (const r of sorted) {
        const verdict = r.ttft < 1000 ? 'FAST' : r.ttft < 2000 ? 'OK' : r.ttft < 3000 ? 'BORDERLINE' : 'SLOW';
        console.log(`  ${r.name}: ${r.ttft}ms TTFT [${verdict}]`);
    }
    console.log('='.repeat(80));
}

main().catch(console.error);

function getAskResponseBudget(selection = '') {
    if (selection.startsWith('profile:')) {
        return {
            maxTokens: 320,
            temperature: 0.35,
            guidance: `LATENCY MODE:
- Optimize for fastest useful answer.
- Default to 1 short headline and 2-4 bullets.
- Give hints, suggestions, and findings instead of scripted answers.
- Lead with the strongest angle, example, or risk.
- Keep total output under roughly 90 words unless the user explicitly asks for depth.
- Skip meta-analysis, repetition, and long framing.`,
        };
    }

    if (selection.startsWith('preset:')) {
        return {
            maxTokens: 384,
            temperature: 0.4,
            guidance: `LATENCY MODE:
- Keep the answer compact and action-first.
- Prefer 1 short headline and 2-3 bullets.
- Keep total output under roughly 120 words unless the user explicitly asks for depth.`,
        };
    }

    return {
        maxTokens: 512,
        temperature: 0.45,
        guidance: `LATENCY MODE:
- Keep the answer concise and high-signal.
- Avoid long explanations unless the user asks for them.`,
    };
}

function getListenResponseBudget(selection = '') {
    if (selection.startsWith('profile:')) {
        return {
            maxTokens: 220,
            temperature: 0.2,
            guidance: `LIVE COACHING LATENCY MODE:
- Prioritize the best hint for the next 10 seconds.
- Keep total output under roughly 80 words.
- Use at most 2 bullets in "Hints", 3 bullets in "Findings", and 2 numbered "Suggestions".
- Give answer ingredients, not a finished script.`,
        };
    }

    if (selection.startsWith('preset:')) {
        return {
            maxTokens: 256,
            temperature: 0.25,
            guidance: `LIVE COACHING LATENCY MODE:
- Keep the output brief and tactical.
- Use very short bullets and avoid post-hoc analysis.`,
        };
    }

    return {
        maxTokens: 320,
        temperature: 0.3,
        guidance: `LIVE COACHING LATENCY MODE:
- Keep the output concise, tactical, and easy to scan.`,
    };
}

module.exports = {
    getAskResponseBudget,
    getListenResponseBudget,
};

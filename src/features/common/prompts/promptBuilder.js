const { profilePrompts } = require('./promptTemplates.js');
const { getFullInterviewContext } = require('./interviewContext.js');

function buildSystemPrompt(promptParts, interviewContext = '') {
    const sections = [promptParts.intro, '\n\n', promptParts.formatRequirements];

    if (promptParts.searchUsage) {
        sections.push('\n\n', promptParts.searchUsage);
    }

    sections.push('\n\n', promptParts.content);

    // Inject interview context where the template expects it
    let outputInstructions = promptParts.outputInstructions || '';
    if (outputInstructions.includes('{{INTERVIEW_CONTEXT}}')) {
        outputInstructions = outputInstructions.replace('{{INTERVIEW_CONTEXT}}', interviewContext);
    } else if (interviewContext) {
        outputInstructions = interviewContext + '\n\n' + outputInstructions;
    }

    sections.push('\n\n', outputInstructions);

    return sections.join('');
}

function getSystemPrompt(profile, conversationHistory = '', googleSearchEnabled = false) {
    const promptParts = profilePrompts[profile] || profilePrompts.general;
    const interviewContext = getFullInterviewContext(profile) + '\n\nCONVERSATION HISTORY:\n' + conversationHistory;
    return buildSystemPrompt(promptParts, interviewContext);
}

module.exports = {
    getSystemPrompt,
};

const Store = require('electron-store');
const authService = require('../services/authService');
const presetRepository = require('../repositories/preset');
const { getSystemPrompt } = require('./promptBuilder');

const DEFAULT_PROFILE_KEY = 'hebbia';
const store = new Store({
    name: 'pickle-glass-settings',
    defaults: {
        users: {},
    },
});

function normalizeSelection(selection) {
    if (typeof selection !== 'string' || selection.length === 0) {
        return null;
    }
    if (selection.startsWith('profile:') || selection.startsWith('preset:')) {
        return selection;
    }
    return null;
}

async function getActivePromptSelection() {
    try {
        const uid = authService.getCurrentUserId();
        const userSettingsKey = uid ? `users.${uid}` : 'users.default';
        const normalized = normalizeSelection(store.get(`${userSettingsKey}.profile`));
        if (normalized) {
            return normalized;
        }
    } catch (error) {
        console.warn('[ActivePromptResolver] Failed to read active prompt selection:', error.message);
    }

    if (global.tarsActiveProfile) {
        return `profile:${global.tarsActiveProfile}`;
    }

    return `profile:${DEFAULT_PROFILE_KEY}`;
}

async function resolveActiveSystemPrompt(conversationHistory = '') {
    const selection = await getActivePromptSelection();

    if (selection.startsWith('preset:')) {
        const presetId = selection.slice('preset:'.length);
        const presets = await presetRepository.getPresets();
        const preset = presets.find((item) => item.id === presetId);
        if (preset?.prompt) {
            const systemPrompt = conversationHistory
                ? `${preset.prompt}\n\nCONVERSATION HISTORY:\n${conversationHistory}`
                : preset.prompt;
            return { selection, source: 'preset', systemPrompt };
        }
    }

    const profileKey = selection.startsWith('profile:')
        ? selection.slice('profile:'.length)
        : DEFAULT_PROFILE_KEY;

    return {
        selection: `profile:${profileKey}`,
        source: 'profile',
        systemPrompt: getSystemPrompt(profileKey, conversationHistory, false),
    };
}

module.exports = {
    DEFAULT_PROFILE_KEY,
    getActivePromptSelection,
    resolveActiveSystemPrompt,
};

const modeSelect = document.getElementById('mode');
const audioOnlyInput = document.getElementById('audio-only');
const testModeInput = document.getElementById('test-mode');
const openTabInput = document.getElementById('open-tab');
const launchButton = document.getElementById('launch-button');
const launchForm = document.getElementById('launch-form');
const healthText = document.getElementById('health-text');
const configText = document.getElementById('config-text');
const resultPanel = document.getElementById('result-panel');
const resultStatus = document.getElementById('result-status');
const resultMode = document.getElementById('result-mode');
const resultPersona = document.getElementById('result-persona');
const resultConversation = document.getElementById('result-conversation');
const resultLink = document.getElementById('result-link');
const errorPanel = document.getElementById('error-panel');
const errorText = document.getElementById('error-text');
const copyButton = document.getElementById('copy-button');

let latestUrl = '';

function setError(message) {
    errorText.textContent = message;
    errorPanel.classList.remove('hidden');
}

function clearError() {
    errorText.textContent = '';
    errorPanel.classList.add('hidden');
}

function showResult(result) {
    latestUrl = result.conversationUrl;
    resultStatus.textContent = result.testMode ? 'test mode' : result.status;
    resultMode.textContent = `${result.mode} • ${result.audioOnly ? 'audio-only' : 'video'}`;
    resultPersona.textContent = `${result.personaId}${result.personaCreated ? ' (new)' : ' (reused)'}`;
    resultConversation.textContent = result.conversationId;
    resultLink.href = result.conversationUrl;
    resultLink.textContent = result.conversationUrl;
    resultPanel.classList.remove('hidden');
}

async function loadConfig() {
    const [healthResponse, configResponse] = await Promise.all([
        fetch('/api/health'),
        fetch('/api/config'),
    ]);

    const health = await healthResponse.json();
    const config = await configResponse.json();

    healthText.textContent = health.hasApiKey
        ? 'Tavus API key loaded from local .env'
        : 'Missing TAVUS_API_KEY in local .env';

    for (const mode of config.modes) {
        const option = document.createElement('option');
        option.value = mode;
        option.textContent = mode;
        if (mode === config.defaultMode) {
            option.selected = true;
        }
        modeSelect.append(option);
    }

    audioOnlyInput.checked = config.defaultAudioOnly;
    configText.textContent = config.hasSavedPersona
        ? `Saved Tavus persona found for prompt ${config.personaVersion}. Launches should be faster. Replica: ${config.replicaId}.`
        : `No compatible saved Tavus persona found for prompt ${config.personaVersion}. First launch will create one. Replica: ${config.replicaId}.`;
}

launchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();
    launchButton.disabled = true;
    launchButton.textContent = 'Launching…';

    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mode: modeSelect.value,
                audioOnly: audioOnlyInput.checked,
                testMode: testModeInput.checked,
            }),
        });

        const result = await response.json();
        if (!response.ok || !result.ok) {
            throw new Error(result.error || `Request failed with HTTP ${response.status}`);
        }

        showResult(result);

        if (!result.testMode && openTabInput.checked) {
            window.open(result.conversationUrl, '_blank', 'noopener,noreferrer');
        }
    } catch (error) {
        setError(error.message);
    } finally {
        launchButton.disabled = false;
        launchButton.textContent = 'Launch Mock Interview';
    }
});

copyButton.addEventListener('click', async () => {
    if (!latestUrl) {
        return;
    }

    try {
        await navigator.clipboard.writeText(latestUrl);
        copyButton.textContent = 'Copied';
        window.setTimeout(() => {
            copyButton.textContent = 'Copy URL';
        }, 1200);
    } catch {
        setError('Clipboard write failed. Copy the URL manually.');
    }
});

loadConfig().catch((error) => {
    setError(error.message);
    healthText.textContent = 'Failed to load local Tavus config';
});

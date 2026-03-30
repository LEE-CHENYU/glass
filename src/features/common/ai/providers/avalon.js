const WebSocket = require('ws');

class AvalonProvider {
    static async validateApiKey(key) {
        if (!key || typeof key !== 'string') {
            return { success: false, error: 'Invalid Aqua Voice API key format.' };
        }

        try {
            const response = await fetch('https://api.aqua.sh/v1/models', {
                headers: { 'Authorization': `Bearer ${key}` }
            });

            if (response.ok) {
                return { success: true };
            } else {
                const errorData = await response.json().catch(() => ({}));
                const message = errorData.error?.message || `Validation failed with status: ${response.status}`;
                return { success: false, error: message };
            }
        } catch (error) {
            console.error('[AvalonProvider] Network error during key validation:', error);
            return { success: false, error: 'A network error occurred during validation.' };
        }
    }
}

async function createSTT({ apiKey, language = 'en', callbacks = {}, ...config }) {
    const wsUrl = 'wss://api.aqua.sh/v1/realtime?intent=transcription';

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'realtime=v1',
    };

    const ws = new WebSocket(wsUrl, { headers });

    return new Promise((resolve, reject) => {
        const connectionTimeout = setTimeout(() => {
            ws.close();
            reject(new Error('[Avalon] WebSocket connection timed out. Avalon may not support realtime STT — try OpenAI or Gemini as STT provider.'));
        }, 10000);

        ws.onopen = () => {
            clearTimeout(connectionTimeout);
            console.log('[Avalon] WebSocket session opened.');

            const sessionConfig = {
                type: 'transcription_session.update',
                session: {
                    input_audio_format: 'pcm16',
                    input_audio_transcription: {
                        model: 'avalon-1',
                        prompt: config.prompt || '',
                        language: language || 'en'
                    },
                    turn_detection: {
                        type: 'server_vad',
                        threshold: 0.5,
                        prefix_padding_ms: 200,
                        silence_duration_ms: 100,
                    },
                    input_audio_noise_reduction: {
                        type: 'near_field'
                    }
                }
            };

            ws.send(JSON.stringify(sessionConfig));

            resolve({
                sendRealtimeInput: (audioData) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        const message = {
                            type: 'input_audio_buffer.append',
                            audio: audioData
                        };
                        ws.send(JSON.stringify(message));
                    }
                },
                close: () => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'session.close' }));
                        ws.onmessage = ws.onerror = () => {};
                        ws.close(1000, 'Client initiated close.');
                    }
                }
            });
        };

        ws.onmessage = (event) => {
            if (!event.data || event.data === 'null' || event.data === '[DONE]') return;

            let msg;
            try { msg = JSON.parse(event.data); }
            catch { return; }

            if (!msg || typeof msg !== 'object') return;

            msg.provider = 'avalon';
            callbacks.onmessage?.(msg);
        };

        ws.onerror = (error) => {
            clearTimeout(connectionTimeout);
            console.error('[Avalon] WebSocket error:', error.message);
            callbacks.onerror?.(error);
            reject(error);
        };

        ws.onclose = (event) => {
            clearTimeout(connectionTimeout);
            console.log(`[Avalon] WebSocket closed: ${event.code} ${event.reason}`);
            callbacks.onclose?.(event);
        };
    });
}

module.exports = {
    AvalonProvider,
    createSTT,
};

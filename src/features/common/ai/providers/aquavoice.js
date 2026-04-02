const WebSocket = require('ws');

const DEFAULT_HTTP_BASE_URL = process.env.AQUA_VOICE_API_URL || 'https://api.aquavoice.com/api/v1';
const DEFAULT_WS_URL = process.env.AQUA_VOICE_WS_URL || 'wss://api.aquavoice.com/api/v1/realtime?intent=transcription';
const DEFAULT_MODEL = process.env.AQUA_VOICE_STT_MODEL || 'avalon-v1-en';

class AquaVoiceProvider {
    static async validateApiKey(key) {
        if (!key || typeof key !== 'string' || !key.startsWith('ava_')) {
            return { success: false, error: 'Invalid Aqua Voice API key format.' };
        }

        try {
            const formData = new FormData();
            formData.append('model', DEFAULT_MODEL);

            const response = await fetch(`${DEFAULT_HTTP_BASE_URL}/audio/transcriptions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${key}`,
                },
                body: formData,
            });

            if (response.ok) {
                return { success: true };
            }

            const errorData = await response.json().catch(() => ({}));

            // Aqua validates auth before file presence. A "missing file" response is
            // sufficient proof that the API key is accepted by the endpoint.
            if (response.status === 400) {
                const fileErrors = errorData.file;
                const missingFile = Array.isArray(fileErrors) && fileErrors.some(msg => typeof msg === 'string' && msg.includes('No file was submitted'));
                if (missingFile) {
                    return { success: true };
                }
            }

            if (response.status === 401) {
                return { success: false, error: 'Unauthorized. Check your Aqua Voice API key.' };
            }

            const message =
                errorData.detail ||
                errorData.error?.message ||
                `Validation failed with status: ${response.status}`;

            return { success: false, error: message };
        } catch (error) {
            console.error('[AquaVoiceProvider] Network error during key validation:', error);
            return { success: false, error: 'A network error occurred during validation.' };
        }
    }
}

async function createSTT({ apiKey, model = DEFAULT_MODEL, language = 'en', callbacks = {}, ...config }) {
    const ws = new WebSocket(DEFAULT_WS_URL, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'OpenAI-Beta': 'realtime=v1',
        },
    });

    return new Promise((resolve, reject) => {
        const rejectWithContext = (message) => {
            const error = new Error(
                `${message}. Aqua Voice batch transcription is verified, but realtime may require a different websocket URL. Override AQUA_VOICE_WS_URL if needed.`
            );
            callbacks.onerror?.(error);
            reject(error);
        };

        ws.onopen = () => {
            const sessionConfig = {
                type: 'transcription_session.update',
                session: {
                    input_audio_format: 'pcm16',
                    input_audio_transcription: {
                        model,
                        prompt: config.prompt || '',
                        language: language || 'en',
                    },
                    turn_detection: {
                        type: 'server_vad',
                        threshold: 0.5,
                        prefix_padding_ms: 200,
                        silence_duration_ms: 100,
                    },
                    input_audio_noise_reduction: {
                        type: 'near_field',
                    },
                },
            };

            ws.send(JSON.stringify(sessionConfig));

            const keepAlive = () => {
                try {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.ping();
                    }
                } catch (err) {
                    console.error('[AquaVoice STT] keepAlive error:', err.message);
                }
            };

            resolve({
                sendRealtimeInput: (audioData) => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({
                            type: 'input_audio_buffer.append',
                            audio: audioData,
                        }));
                    }
                },
                keepAlive,
                close: () => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ type: 'session.close' }));
                        ws.onmessage = ws.onerror = () => {};
                        ws.close(1000, 'Client initiated close.');
                    }
                },
            });
        };

        ws.onmessage = (event) => {
            if (!event.data || event.data === 'null' || event.data === '[DONE]') return;

            let msg;
            try {
                msg = JSON.parse(event.data);
            } catch {
                return;
            }

            if (!msg || typeof msg !== 'object') return;

            msg.provider = 'aquavoice';
            callbacks.onmessage?.(msg);
        };

        ws.on('unexpected-response', (_request, response) => {
            rejectWithContext(`Aqua Voice realtime websocket failed with HTTP ${response.statusCode} at ${DEFAULT_WS_URL}`);
        });

        ws.onerror = (error) => {
            console.error('[AquaVoiceProvider] WebSocket error:', error.message);
            rejectWithContext(`Aqua Voice realtime websocket error: ${error.message}`);
        };

        ws.onclose = (event) => {
            callbacks.onclose?.(event);
        };
    });
}

module.exports = {
    AquaVoiceProvider,
    createSTT,
};

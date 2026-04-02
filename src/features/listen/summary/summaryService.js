const { BrowserWindow } = require('electron');
const { resolveActiveSystemPrompt } = require('../../common/prompts/activePromptResolver.js');
const { getListenResponseBudget } = require('../../common/prompts/responseBudget');
const { createLLM } = require('../../common/ai/factory');
const sessionRepository = require('../../common/repositories/session');
const summaryRepository = require('./repositories');
const modelStateService = require('../../common/services/modelStateService');

class SummaryService {
    constructor() {
        this.previousAnalysisResult = null;
        this.analysisHistory = [];
        this.conversationHistory = [];
        this.currentSessionId = null;
        
        // Callbacks
        this.onAnalysisComplete = null;
        this.onStatusUpdate = null;
    }

    setCallbacks({ onAnalysisComplete, onStatusUpdate }) {
        this.onAnalysisComplete = onAnalysisComplete;
        this.onStatusUpdate = onStatusUpdate;
    }

    setSessionId(sessionId) {
        this.currentSessionId = sessionId;
    }

    sendToRenderer(channel, data) {
        const { windowPool } = require('../../../window/windowManager');
        const listenWindow = windowPool?.get('listen');
        
        if (listenWindow && !listenWindow.isDestroyed()) {
            listenWindow.webContents.send(channel, data);
        }
    }

    addConversationTurn(speaker, text) {
        const conversationText = `${speaker.toLowerCase()}: ${text.trim()}`;
        this.conversationHistory.push(conversationText);
        console.log(`💬 Added conversation text: ${conversationText}`);
        console.log(`📈 Total conversation history: ${this.conversationHistory.length} texts`);

        // Trigger analysis if needed
        this.triggerAnalysisIfNeeded();
    }

    getConversationHistory() {
        return this.conversationHistory;
    }

    resetConversationHistory() {
        this.conversationHistory = [];
        this.previousAnalysisResult = null;
        this.analysisHistory = [];
        console.log('🔄 Conversation history and analysis state reset');
    }

    /**
     * Converts conversation history into text to include in the prompt.
     * @param {Array<string>} conversationTexts - Array of conversation texts ["me: ~~~", "them: ~~~", ...]
     * @param {number} maxTurns - Maximum number of recent turns to include
     * @returns {string} - Formatted conversation string for the prompt
     */
    formatConversationForPrompt(conversationTexts, maxTurns = 30) {
        if (conversationTexts.length === 0) return '';
        return conversationTexts.slice(-maxTurns).join('\n');
    }

    async makeOutlineAndRequests(conversationTexts, maxTurns = 30) {
        console.log(`🔍 makeOutlineAndRequests called - conversationTexts: ${conversationTexts.length}`);

        if (conversationTexts.length === 0) {
            console.log('⚠️ No conversation texts available for analysis');
            return null;
        }

        const recentConversation = this.formatConversationForPrompt(conversationTexts, maxTurns);

        // Include the previous coaching result so the helper can stay consistent.
        let contextualPrompt = '';
        if (this.previousAnalysisResult) {
            contextualPrompt = `
Previous Coaching Context:
- Findings: ${this.previousAnalysisResult.topic.header}
- Hints: ${this.previousAnalysisResult.summary.slice(0, 3).join(', ')}
- Suggestions: ${this.previousAnalysisResult.actions.slice(0, 2).join(', ')}

Build on this context, but update it if the conversation has clearly shifted.
`;
        }

        const { systemPrompt, selection } = await resolveActiveSystemPrompt(recentConversation);
        const responseBudget = getListenResponseBudget(selection);
        console.log(`[SummaryService] Active prompt selection: ${selection}`);
        console.log(`[SummaryService] Listen latency budget: maxTokens=${responseBudget.maxTokens}, temperature=${responseBudget.temperature}`);

        try {
            if (this.currentSessionId) {
                await sessionRepository.touch(this.currentSessionId);
            }

            const modelInfo = await modelStateService.getCurrentModelInfo('llm');
            if (!modelInfo || !modelInfo.apiKey) {
                throw new Error('AI model or API key is not configured.');
            }
            console.log(`🤖 Sending coaching request to ${modelInfo.provider} using model ${modelInfo.model}`);
            
            const messages = [
                {
                    role: 'system',
                    content: `${systemPrompt}\n\n${responseBudget.guidance}`,
                },
                {
                    role: 'user',
                    content: `${contextualPrompt}

Provide live interview help, not post-hoc analysis. Format your response exactly like this:

**Hints**
- First answer direction, angle, or fact to use
- Second supporting example, number, or caution

**Findings: [Short Label]**
- What the interviewer is really testing
- Which story, fact, or number matters most
- What to avoid, trim, or not over-explain

**Suggestions**
1. The best next move or answer angle
2. A fallback move if the conversation shifts

Rules:
- Prioritize what Cheney should keep in mind in the next 10 seconds
- Keep each bullet short enough to glance quickly
- Keep the whole response very short
- If the interviewer asked a direct question, give answer ingredients, not a finished response
- If no clear question has been asked yet, suggest how to steer the conversation
- Avoid generic analysis, long summaries, and post-meeting advice
- Do not write a polished script unless explicitly asked`,
                },
            ];

            console.log('🤖 Sending coaching request to AI...');

            const llm = createLLM(modelInfo.provider, {
                apiKey: modelInfo.apiKey,
                model: modelInfo.model,
                temperature: responseBudget.temperature,
                maxTokens: responseBudget.maxTokens,
                usePortkey: modelInfo.provider === 'openai-glass',
                portkeyVirtualKey: modelInfo.provider === 'openai-glass' ? modelInfo.apiKey : undefined,
            });

            const completion = await llm.chat(messages);

            const responseText = completion.content;
            console.log(`✅ Coaching response received: ${responseText}`);
            const structuredData = this.parseResponseText(responseText, this.previousAnalysisResult);

            if (this.currentSessionId) {
                try {
                    summaryRepository.saveSummary({
                        sessionId: this.currentSessionId,
                        text: responseText,
                        tldr: structuredData.summary.join('\n'),
                        bullet_json: JSON.stringify(structuredData.topic.bullets),
                        action_json: JSON.stringify(structuredData.actions),
                        model: modelInfo.model
                    });
                } catch (err) {
                    console.error('[DB] Failed to save summary:', err);
                }
            }

            // 분석 결과 저장
            this.previousAnalysisResult = structuredData;
            this.analysisHistory.push({
                timestamp: Date.now(),
                data: structuredData,
                conversationLength: conversationTexts.length,
            });

            if (this.analysisHistory.length > 10) {
                this.analysisHistory.shift();
            }

            return structuredData;
        } catch (error) {
            console.error('❌ Error during analysis generation:', error.message);
            return this.previousAnalysisResult; // 에러 시 이전 결과 반환
        }
    }

    parseResponseText(responseText, previousResult) {
        const structuredData = {
            summary: [],
            topic: { header: '', bullets: [] },
            actions: [],
            followUps: ['✉️ Send a thank-you note', '📝 Log strongest examples', '✅ Write next-step follow-ups'],
        };

        // 이전 결과가 있으면 기본값으로 사용
        if (previousResult) {
            structuredData.topic.header = previousResult.topic.header;
            structuredData.summary = [...previousResult.summary];
        }

        try {
            const lines = responseText.split('\n');
            let currentSection = '';
            let topicName = '';

            for (const line of lines) {
                const trimmedLine = line.trim();

                // 섹션 헤더 감지
                if (
                    trimmedLine.startsWith('**Hints**') ||
                    trimmedLine.startsWith('**What To Say Now**') ||
                    trimmedLine.startsWith('**Summary Overview**')
                ) {
                    currentSection = 'summary';
                    continue;
                } else if (
                    trimmedLine.startsWith('**Findings:') ||
                    trimmedLine.startsWith('**Current Focus:') ||
                    trimmedLine.startsWith('**Key Topic:')
                ) {
                    currentSection = 'topic';
                    topicName =
                        trimmedLine.match(/\*\*Findings: (.+?)\*\*/)?.[1] ||
                        trimmedLine.match(/\*\*Current Focus: (.+?)\*\*/)?.[1] ||
                        trimmedLine.match(/\*\*Key Topic: (.+?)\*\*/)?.[1] ||
                        '';
                    structuredData.topic.header = topicName
                        ? trimmedLine.startsWith('**Findings:')
                            ? `Findings: ${topicName}`
                            : trimmedLine.startsWith('**Current Focus:')
                            ? `Current Focus: ${topicName}`
                            : `${topicName}:`
                        : 'Findings';
                    continue;
                } else if (
                    trimmedLine.startsWith('**Suggestions**') ||
                    trimmedLine.startsWith('**Next Moves**') ||
                    trimmedLine.startsWith('**Suggested Questions**')
                ) {
                    currentSection = 'actions';
                    continue;
                }

                // 컨텐츠 파싱
                if (trimmedLine.startsWith('-') && currentSection === 'summary') {
                    const summaryPoint = trimmedLine.substring(1).trim();
                    if (summaryPoint && !structuredData.summary.includes(summaryPoint)) {
                        // 기존 summary 업데이트 (최대 5개 유지)
                        structuredData.summary.unshift(summaryPoint);
                        if (structuredData.summary.length > 5) {
                            structuredData.summary.pop();
                        }
                    }
                } else if (trimmedLine.startsWith('-') && currentSection === 'topic') {
                    const bullet = trimmedLine.substring(1).trim();
                    if (bullet && structuredData.topic.bullets.length < 3) {
                        structuredData.topic.bullets.push(bullet);
                    }
                } else if (trimmedLine.match(/^\d+\./) && currentSection === 'actions') {
                    const move = trimmedLine.replace(/^\d+\.\s*/, '').trim();
                    if (move) {
                        structuredData.actions.push(move);
                    }
                }
            }

            // 기본 액션 추가
            const defaultActions = ['✨ Give me a tighter answer', '💬 What should I say next?'];
            defaultActions.forEach(action => {
                if (!structuredData.actions.includes(action)) {
                    structuredData.actions.push(action);
                }
            });

            // 액션 개수 제한
            structuredData.actions = structuredData.actions.slice(0, 5);

            // 유효성 검증 및 이전 데이터 병합
            if (structuredData.summary.length === 0 && previousResult) {
                structuredData.summary = previousResult.summary;
            }
            if (structuredData.topic.bullets.length === 0 && previousResult) {
                structuredData.topic.bullets = previousResult.topic.bullets;
            }
        } catch (error) {
            console.error('❌ Error parsing response text:', error);
            // 에러 시 이전 결과 반환
            return (
                previousResult || {
                    summary: [],
                    topic: { header: 'Findings', bullets: [] },
                    actions: ['✨ Give me a tighter answer', '💬 What should I say next?'],
                    followUps: ['✉️ Send a thank-you note', '📝 Log strongest examples', '✅ Write next-step follow-ups'],
                }
            );
        }

        console.log('📊 Final structured data:', JSON.stringify(structuredData, null, 2));
        return structuredData;
    }

    /**
     * Triggers analysis when conversation history reaches 5 texts.
     */
    async triggerAnalysisIfNeeded() {
        if (this.conversationHistory.length >= 5 && this.conversationHistory.length % 5 === 0) {
            console.log(`Triggering analysis - ${this.conversationHistory.length} conversation texts accumulated`);

            const data = await this.makeOutlineAndRequests(this.conversationHistory);
            if (data) {
                console.log('Sending structured data to renderer');
                this.sendToRenderer('summary-update', data);
                
                // Notify callback
                if (this.onAnalysisComplete) {
                    this.onAnalysisComplete(data);
                }
            } else {
                console.log('No analysis data returned');
            }
        }
    }

    getCurrentAnalysisData() {
        return {
            previousResult: this.previousAnalysisResult,
            history: this.analysisHistory,
            conversationLength: this.conversationHistory.length,
        };
    }
}

module.exports = SummaryService; 

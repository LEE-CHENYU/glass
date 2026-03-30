const savvy = {
    company: 'Savvy Wealth',
    role: 'Software Engineer, Applied AI',
    status: 'Applied',
    comp: '$165-260K + equity',
    companyProfile: 'AI platform for financial advisors. Automates onboarding, portfolio recommendations, financial planning. AUM $5.1B, 600%+ growth in 18mo. $105M+ total, $72M Series B (Jul 2025, Industry Ventures). Thrive Capital, Index. They use Claude Code and Cursor internally.',
    keyPeople: [
        { name: 'Ritik Malhotra', title: 'Founder & CEO', note: '2 exits (Box/Brex), YC, Thiel Fellow, Berkeley EECS' },
        { name: 'Eric Hurkman', title: 'CTO', note: 'Ex-VP Eng Carta, ex-CTO Say/Robinhood — building the AI eng team' },
    ],
    roleDetails: 'Build AI copilots, agents, automations for advisors. Full product dev lifecycle. Rails, React, Next.js, PostgreSQL, GraphQL. "All levels" (mid, senior, staff).',
    interviewPrep: {
        llmIntegration: 'Claude API for: thesis generation from transcripts, belief update proposals with bias detection, model parameter updates respecting waterfall math. Built structured output parsers, guardrails.',
        copilotArchitecture: "Start with the compliance check (rules-as-code, runs automatically). Then: portfolio monitoring (what changed since last review?). Then: client-facing summary generation (structured, auditable). Don't start with chat — advisors need structured outputs, not conversations.",
    },
    whyThisCompany: "Advisors need structured outputs, not chatbots. Your approach of building AI into the workflow — not on top of it — is right.",
};
module.exports = savvy;

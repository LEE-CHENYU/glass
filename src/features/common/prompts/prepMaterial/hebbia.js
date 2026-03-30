const hebbia = {
    company: 'Hebbia',
    role: 'Solutions Engineer',
    status: 'ACTIVE INTERVIEW',
    comp: '$150-200K base, 70:30 split (50% team / 50% individual), uncapped bonus + equity',
    companyProfile: 'AI research platform for finance/legal. "Matrix" extracts and analyzes filings, transcripts, contracts. Powers 40%+ of largest asset managers (BlackRock, KKR, Carlyle, Centerview). 50K+ active users, 1M docs/month. $159M total funding, $130M Series B (a16z, Index, Peter Thiel, Eric Schmidt). ~$700M valuation. Revenue 15x, headcount 5x in 18 months.',
    keyPeople: [
        { name: 'George Sivulka', title: 'Founder & CEO', note: 'Stanford PhD dropout, ML/neuroscience' },
        { name: 'Aabhas Sharma', title: 'CTO', note: 'Ex-Uber, ex-Found. Runs tech + product' },
        { name: 'Barry Duong', title: 'Head of AI Strategy', note: 'Hiring manager for AI Strategist role' },
        { name: 'Scott Bianco', title: 'Head of Talent (Eng/Product/Design)', note: 'Ex-Google talent lead' },
    ],
    roleDetails: 'Revenue-critical leader owning technical strategy in enterprise evaluations. Lead technical discovery through deal closure. Transform customer challenges into structured Hebbia solution frameworks. Design and configure AI workflows. Deliver high-stakes demos. Partner with Sales on win rates and deal velocity. Requires: 5+ yr customer-facing technical roles. Preferred: Banking, AM, Private Markets, Legal analyst experience.',
    interviewPrep: {
        discoveryCall: 'Ask the right questions: What filings are you searching across? How many per deal? What is the bottleneck — finding the data or synthesizing it? What does your current workflow look like? (manual search? ctrl+F?) How many deals per year? What is the turnaround expectation? Who consumes the output — associates? VPs? partners?',
        mockDemo: 'Scenario: "I am an analyst looking at a potential acquisition. I need to find all revenue recognition policy changes across 50 target company filings from the last 5 years." Show: search -> retrieve -> synthesize -> structured output.',
        llmKnowledge: 'Embedding quality matters more than model size for retrieval. Materiality gating prevents noise (5% revenue / 10% OI threshold). Structured output parsing is non-negotiable for financial data. Hallucination guardrails for numbers — never trust LLM-generated financial figures without source attribution. RAG vs. fine-tuning: RAG wins for financial docs because the corpus changes constantly (new filings every quarter).',
        technicalToNonTechnical: 'VCV deal meetings — explaining CRE underwriting model assumptions. Hackathon presentation — AI video storytelling tool to judges. Investment memos — structuring complex analysis for decision-makers.',
        experienceGap: 'They ask 5+ yr customer-facing. You have ~1.5yr at VCV. Frame it as: "I have been the analyst in the room. I know the workflow from the user side, not the vendor side. That is actually harder to teach — you can train someone on sales process, you cannot train domain intuition."',
    },
    whyThisCompany: 'I built the 10-K pipeline — I know where AI helps and where it produces confident garbage. I want to help your clients get real value from the platform.',
};
module.exports = hebbia;

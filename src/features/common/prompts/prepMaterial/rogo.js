const rogo = {
    company: 'Rogo',
    role: 'PM, AI & Financial Intelligence',
    status: 'Applied',
    comp: 'Not listed (median SWE comp: $311K)',
    companyProfile: 'AI analyst for Wall Street (IB, PE, HF). 25,000+ finance professionals. Acquired Offset (Mar 2026) for AI agents in financial workflows. ~$150M total funding, $75M Series C (Sequoia, Jan 2026). 31 open roles.',
    keyPeople: [
        { name: 'Gabriel Stengel', title: 'Co-Founder & CEO', note: 'Ex-Lazard, Princeton' },
        { name: 'Matt Vickers', title: 'Head of Product', note: 'Ex-Ramp, Columbia MBA — Columbia connection, PM role reports to him' },
        { name: 'Joseph Kim', title: 'VP Eng/Head Applied AI', note: 'Ex-Google Gemini, ex-NASA, MIT' },
    ],
    roleDetails: 'Own features end-to-end (scoping through GTM). Design LLM prompts, build financial workflows (models, dashboards, memos). Requires: 1-2yr finance + 1-2yr product/startup experience. Join sales/demo calls.',
    interviewPrep: {
        financialWorkflow: 'EPS waterfall model updates from earnings transcripts — the model proposes parameter changes while respecting the waterfall math, instead of the analyst manually tracing every assumption.',
        featurePrioritization: 'Start with what wastes the most time: searching across documents, updating models manually, checking if predictions were right. Then: what has the highest error rate (stale model outputs). Then: what builds trust (source attribution on every claim).',
        productShipped: 'The investment journal — identified workflow gaps, built the system, iterated based on real usage (monitoring system grew from 5 to 27 sections as I discovered what I kept forgetting to check).',
    },
    whyThisCompany: "You're building the production version of what I built for myself.",
};
module.exports = rogo;

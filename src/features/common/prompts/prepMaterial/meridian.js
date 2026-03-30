const meridian = {
    company: 'Meridian',
    role: 'Founding Fullstack Engineer',
    status: 'Applied',
    comp: '$150-250K + equity',
    companyProfile: 'Agentic spreadsheet for financial modeling. Standalone IDE (Cursor for finance), not an Excel plugin. Working with Decagon, OffDeal. $17M seed at $100M post-money (a16z, General Partnership, QED, FPV, Litquidity, Feb 2026). $5M contracts signed Dec 2025. 5 employees.',
    keyPeople: [
        { name: 'John Ling', title: 'Co-Founder & CEO', note: 'Ex-Scale AI, Dartmouth' },
        { name: 'George Fang', title: 'Co-Founder & CTO', note: 'Ex-Canopy CTO, ex-Heap, YC 2019 — engineering hiring decision maker' },
        { name: 'Zach Kirshner', title: 'Co-Founder & COO', note: 'Ex-Scale AI, Duke' },
    ],
    roleDetails: 'Build everything — agent systems, data pipelines. "Build solutions that delight customers." No stated YoE bar.',
    interviewPrep: {
        liveBuild: 'Be ready to demo: assumption-driven model where changing one input cascades through the waterfall and shows the delta on EPS and target.',
        whyFinancialModeling: "Spreadsheets don't understand model structure. A stale assumption looks the same as a fresh one. My system flags when stored outputs diverge >2% from re-derived values. That's the failure mode nobody catches in Excel.",
        smallTeam: 'Point to solo building the entire platform — data backend, portfolio app, ML classifier. At a 5-person company, you wear every hat.',
    },
    whyThisCompany: "You're solving the right problem — models should understand their own structure, not just be cells in a grid.",
};
module.exports = meridian;

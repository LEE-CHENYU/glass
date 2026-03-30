const background = {
    name: 'Cheney (Chenyu) Li',

    pitch: `I spent the past few months building an AI-powered investment research platform. The data backend screens 44,000 companies through a 3-stage pipeline, the portfolio app runs on real capital with multi-broker sync, and there's a prediction tracker that measures whether my probability estimates were actually right. I built it because existing tools don't match how investors actually work. Now I want to build this for more people than myself.`,

    resume: {
        education: 'Columbia University M.S. | Shanghai Jiao Tong University B.A. (Japanese Language & Finance)',
        languages: 'Mandarin Chinese (native), English (professional), Japanese (JLPT N1, business fluency)',
        visa: 'H-1B (self-sponsored), transfer is straightforward — no lottery needed',
    },

    keyNumbers: {
        securitiesEngine: '48 endpoints, 44K companies, 6 data sources (SimFin, Compustat, CRSP, ProQuest, FRED, SEC EDGAR), 96 FRED macro factors, 258 calibrated causal edges, 10-K text pipeline with vector search (LanceDB)',
        investmentJournal: 'Flask dashboard, multi-broker sync (Schwab OAuth, Futu/Moomoo), EPS waterfall with >2% drift detection, Bayesian prediction tracker (Brier score), compliance-as-code, 10 cron jobs, 27-section monitoring',
        stockArchetypes: '38,604 stock lifecycles (1925-2024), 8 archetypes at 96.8% accuracy',
        totalCode: '~167K lines of Python across both systems',
    },

    experience: [
        { role: 'Quantitative Investment Research Platform', company: 'Independent', period: 'Oct 2025-Present', location: 'New York, NY' },
        { role: 'Founder & Product Lead', company: 'HappyHunting', period: 'Jan 2025-Sept 2025', location: 'Independent' },
        { role: 'Product & Project Manager (AI Infrastructure)', company: 'Atlas Cloud', period: 'May 2023-Dec 2024', location: 'New York, NY' },
        { role: 'Product & Strategy Analyst', company: 'VCV Digital', period: 'May 2023-Dec 2024', location: 'New York, NY' },
        { role: 'Equity Research Intern', company: 'Guosheng Securities', period: 'Oct 2021-Dec 2021', location: 'Shanghai, China' },
    ],

    differentiators: [
        '"I am the user" — built the tool because I needed it, not as an exercise',
        'Finance + engineering hybrid is rare — most SEs/PMs come from one side',
        'Trilingual: Mandarin (native), English (professional), Japanese (JLPT N1)',
        'Columbia alum',
        'Top 5 @ ElevenLabs/a16z Consumer AI Hackathon',
    ],

    commonQA: {
        whyLeaving: "I'm not leaving — I'm looking for the right team to build this with. I proved to myself I can build the system solo. Now I want to build the production version with a team that's solving the same problem at scale.",
        experience: "In those 3 years I evaluated private deals, built financial models for real capital allocation, shipped an automation product, and built a 167K-line investment research platform solo. I move fast when I understand the problem, and I understand financial workflows because I've been the frustrated user.",
        weakness: "I haven't scaled a system to thousands of users. My platform runs for one user — me. I know how to build the right thing; I'm still learning how to build it for everyone. That's exactly why I want to join a team.",
        visa: "I'm currently on H-1B (self-sponsored). An H-1B transfer is straightforward — no lottery needed, can start working as soon as the petition is filed.",
    },
};

module.exports = background;

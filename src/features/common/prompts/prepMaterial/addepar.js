const addepar = {
    company: 'Addepar',
    role: 'Forward Deployed Engineer',
    status: 'Applied',
    comp: '$107-168K + bonus + equity',
    companyProfile: 'Wealth management platform. Launched Addison AI (Mar 2026) — NL portfolio analysis. 1,400+ firms in 60 countries. ~$9T in assets. $230M Series G, $3.25B valuation. Founded by Joe Lonsdale (Palantir co-founder).',
    keyPeople: [
        { name: 'Joe Lonsdale', title: 'Founder & Exec Chair', note: 'Palantir co-founder' },
        { name: 'Eric Poirier', title: 'CEO', note: '' },
        { name: 'Don Nilsson', title: 'CPO', note: 'Ex-FactSet 23 years — FDE reports into product org' },
    ],
    roleDetails: 'Extension of the platform, not a services org. Build custom data integrations for enterprise clients. Extend platform capabilities, contribute to core codebase. Requires: 2+ yr professional SWE. Nice-to-haves: Spark, Flink, Arrow.',
    interviewPrep: {
        dataIntegration: 'Multi-broker reconciliation: Schwab API + Futu API + CSV imports. Caught $62K error (LLC cash vs SNVXX money market conflation). Caught JPY to USD conversion error inflating Asia allocation 10% to 47%.',
        clientWork: 'VCV Digital — sat in deal meetings, translated financial analysis into actionable recommendations. Built models that non-technical partners could use.',
    },
    whyThisCompany: 'I built multi-broker data integration for myself. I know the data problems wealth management firms deal with.',
};
module.exports = addepar;

const background = require('./prepMaterial/background');
const hebbia = require('./prepMaterial/hebbia');
const rogo = require('./prepMaterial/rogo');
const meridian = require('./prepMaterial/meridian');
const addepar = require('./prepMaterial/addepar');
const savvy = require('./prepMaterial/savvy');

const companies = { hebbia, rogo, meridian, addepar, savvy };

function getBackgroundContext() {
    const b = background;
    return `ABOUT YOU:
Name: ${b.name}
${b.resume.education}
Languages: ${b.resume.languages}
Visa: ${b.resume.visa}

YOUR 30-SECOND PITCH:
${b.pitch}

KEY NUMBERS:
- Securities Selection Engine: ${b.keyNumbers.securitiesEngine}
- Investment Journal: ${b.keyNumbers.investmentJournal}
- Stock Archetypes: ${b.keyNumbers.stockArchetypes}
- Total: ${b.keyNumbers.totalCode}

DIFFERENTIATORS:
${b.differentiators.map(d => `- ${d}`).join('\n')}

COMMON Q&A:
Q: Why are you leaving your current role?
A: ${b.commonQA.whyLeaving}

Q: You only have ~3 years of experience. Why should we hire you?
A: ${b.commonQA.experience}

Q: What's your biggest weakness?
A: ${b.commonQA.weakness}

Q: Will you require visa sponsorship?
A: ${b.commonQA.visa}`;
}

function getCompanyContext(companyId) {
    const c = companies[companyId];
    if (!c) return '';

    let context = `TARGET COMPANY: ${c.company}
ROLE: ${c.role}
STATUS: ${c.status}
COMP: ${c.comp}

COMPANY PROFILE:
${c.companyProfile}

KEY PEOPLE:
${c.keyPeople.map(p => `- ${p.name} (${p.title})${p.note ? ' — ' + p.note : ''}`).join('\n')}

ROLE DETAILS:
${c.roleDetails}

WHY THIS COMPANY:
"${c.whyThisCompany}"

INTERVIEW PREP:`;

    for (const [key, value] of Object.entries(c.interviewPrep)) {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim();
        context += `\n\n${label.toUpperCase()}:\n${value}`;
    }

    return context;
}

function getFullInterviewContext(companyId) {
    const parts = [getBackgroundContext()];
    if (companyId && companies[companyId]) {
        parts.push(getCompanyContext(companyId));
    }
    return parts.join('\n\n---\n\n');
}

function getAvailableCompanies() {
    return Object.entries(companies).map(([id, c]) => ({
        id,
        name: c.company,
        role: c.role,
        status: c.status,
    }));
}

module.exports = {
    getBackgroundContext,
    getCompanyContext,
    getFullInterviewContext,
    getAvailableCompanies,
};

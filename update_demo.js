const fs = require('fs');

let source = fs.readFileSync('src/app/decisions/[id]/page.tsx', 'utf8');

const mockData = `const decision = {
  id: "DEMO-12345",
  statement: "Launch new AI-powered predictive market analysis tool targeting enterprise clients.",
  readinessScore: 85,
  assumptions: [
    { id: '1', title: 'Market Demand', description: 'Enterprise clients want predictive analytics.', status: 'VALIDATED', importance: 'high' },
    { id: '2', title: 'Pricing Strategy', description: 'Current SaaS pricing model is acceptable.', status: 'TESTING', importance: 'medium' },
    { id: '3', title: 'Data Privacy Blind Spot', description: 'Enterprise data compliance requirements (GDPR/SOC2) may block adoption.', status: 'CRITICAL', importance: 'critical' },
  ]
};`;

source = source.replace(/import \{ notFound \}[\s\S]*?const blindSpots = decision\.assumptions\.filter\(\(a: any\) => a\.title\.toLowerCase\(\)\.includes\('blind'\)\);/, `import Link from 'next/link';

export default function DemoDashboard() {
  ${mockData}

  const coreAssumptions = decision.assumptions.filter((a) => !a.title.toLowerCase().includes('blind'));
  const blindSpots = decision.assumptions.filter((a) => a.title.toLowerCase().includes('blind'));`);

fs.writeFileSync('src/app/demo/page.tsx', source);
console.log('Demo page updated successfully!');

import Link from 'next/link';

export default function DemoDashboard() {
  const decision = {
  id: "DEMO-12345",
  statement: "Launch new AI-powered predictive market analysis tool targeting enterprise clients.",
  readinessScore: 85,
  assumptions: [
    { id: '1', title: 'Market Demand', description: 'Enterprise clients want predictive analytics.', status: 'VALIDATED', importance: 'high' },
    { id: '2', title: 'Pricing Strategy', description: 'Current SaaS pricing model is acceptable.', status: 'TESTING', importance: 'medium' },
    { id: '3', title: 'Data Privacy Blind Spot', description: 'Enterprise data compliance requirements (GDPR/SOC2) may block adoption.', status: 'CRITICAL', importance: 'critical' },
  ]
};

  const coreAssumptions = decision.assumptions.filter((a) => !a.title.toLowerCase().includes('blind'));
  const blindSpots = decision.assumptions.filter((a) => a.title.toLowerCase().includes('blind'));

  return (
    <>
{/* Atmospheric Glows */}
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
<div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full mix-blend-screen filter blur-[200px] opacity-20 animate-pulse-glow"></div>
<div className="absolute bottom-[-20%] right-[10%] w-[60%] h-[60%] bg-secondary rounded-full mix-blend-screen filter blur-[250px] opacity-10 animate-pulse-glow" style={{"animationDelay":"3s"}}></div>
</div>
{/* Telemetry Bar */}
<div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-50"></div>
<div className="fixed top-2 right-4 z-50 flex items-center gap-2 font-mono-label text-[10px] text-on-surface-variant/50 tracking-widest">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
    SYSTEM ONLINE // VER 4.9.2 // LATENCY: 14ms
</div>
{/* Main Workspace */}
<main className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16 flex flex-col gap-12">
{/* Header & Action Row */}
<header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
<div className="flex flex-col gap-6">
<Link className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-mono-label text-[11px] tracking-widest uppercase w-fit group" href={`/decisions/${decision.id}`}>
<span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    RETURN TO COMMAND
                </Link>
<div>
<h1 className="font-display text-headline-lg-mobile md:text-[2rem] leading-tight text-on-surface tracking-tight max-w-4xl">{decision.statement}</h1>
<div className="flex items-center gap-3 mt-3">
<span className="font-mono-label text-xs text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">ID: {decision.id.substring(0, 8).toUpperCase()}</span>
<span className="font-mono-label text-xs text-on-surface-variant tracking-widest">OP-PHOENIX</span>
</div>
</div>
</div>
{/* Decision Readiness Dial */}
<div className="flex items-center gap-6 glass-card rounded-2xl pr-8 pl-6 py-4 relative group overflow-hidden">
<div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="relative w-28 h-28">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
<circle className="dial-track" cx="50" cy="50" fill="none" r="45" strokeWidth="2"></circle>
{/* Background tick marks */}
<g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
<line transform="rotate(0 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(45 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(90 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(135 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(180 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(225 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(270 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
<line transform="rotate(315 50 50)" x1="50" x2="50" y1="2" y2="5"></line>
</g>
<circle className="dial-progress-glow" cx="50" cy="50" fill="none" r="45" strokeLinecap="round" strokeWidth="4" strokeDasharray="283" strokeDashoffset={283 - (283 * decision.readinessScore) / 100} style={{ stroke: "theme('colors.secondary')", filter: "blur(4px)", transition: "stroke-dashoffset 1s ease-out" }}></circle>
<circle className="dial-progress" cx="50" cy="50" fill="none" r="45" strokeLinecap="round" strokeWidth="2" strokeDasharray="283" strokeDashoffset={283 - (283 * decision.readinessScore) / 100} style={{ stroke: "theme('colors.secondary')", transition: "stroke-dashoffset 1s ease-out" }}></circle>
</svg>
<div className="absolute inset-0 flex items-center justify-center flex-col">
<span className="font-display text-headline-lg-mobile text-secondary tracking-tighter">{decision.readinessScore}<span className="text-sm font-mono-label text-secondary/70">%</span></span>
</div>
</div>
<div className="flex flex-col justify-center gap-1">
<span className="font-mono-label text-[10px] text-secondary tracking-[0.2em] uppercase">Decision Readiness</span>
<span className="font-body-md text-on-surface text-sm">Status: GO Threshold Met</span>
<span className="font-mono-label text-[10px] text-on-surface-variant mt-1">SYS.CONF: HIGH</span>
</div>
</div>
</header>
{/* In-page Navigation */}
<nav className="flex items-center gap-2 border-b border-glass-stroke/50 pb-4 overflow-x-auto no-scrollbar">
<button className="px-5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 font-mono-label text-xs transition-colors whitespace-nowrap shadow-[0_0_10px_rgba(192,193,255,0.1)]">Radar</button>
<button className="px-5 py-1.5 rounded-full text-on-surface-variant hover:bg-glass-fill hover:text-on-surface font-mono-label text-xs transition-colors whitespace-nowrap border border-transparent hover:border-glass-stroke">Vault</button>
<button className="px-5 py-1.5 rounded-full text-on-surface-variant hover:bg-glass-fill hover:text-on-surface font-mono-label text-xs transition-colors whitespace-nowrap border border-transparent hover:border-glass-stroke">Experiments</button>
<button className="px-5 py-1.5 rounded-full text-on-surface-variant hover:bg-glass-fill hover:text-on-surface font-mono-label text-xs transition-colors whitespace-nowrap border border-transparent hover:border-glass-stroke">Firewall</button>
</nav>
{/* Content Grid (Fluid Bento) */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/* Assumptions Grid: Main Overview (Spans 8 cols) */}
<section className="glass-card rounded-2xl p-6 md:p-8 col-span-1 md:col-span-8 flex flex-col gap-6">
<header className="flex justify-between items-center border-b border-glass-stroke/50 pb-4">
<div>
<h2 className="font-body-lg text-lg text-on-surface font-semibold tracking-tight">Assumptions Matrix</h2>
<p className="font-mono-label text-[10px] text-on-surface-variant tracking-[0.2em] mt-1 uppercase">Confidence Interval Mapping</p>
</div>
<span className="material-symbols-outlined text-on-surface-variant/50 text-[20px]">analytics</span>
</header>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
{/* Standard Assumption */}
<div className="p-5 rounded-xl bg-surface/50 border border-glass-stroke hover:border-secondary/30 transition-all flex flex-col gap-4 relative overflow-hidden group">
<div className="absolute inset-0 bg-emerald-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="relative z-10 flex justify-between items-start">
<span className="font-mono-label text-xs text-on-surface bg-surface-variant/50 border border-glass-stroke px-2.5 py-1 rounded">A-01</span>
<div className="flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-mono-label text-[10px] text-secondary tracking-widest uppercase">Node Active</span>
</div>
</div>
<p className="relative z-10 font-body-md text-on-surface/90 text-sm leading-relaxed">Market conditions remain stable through Q3.</p>
<div className="relative z-10 mt-auto pt-4">
<div className="flex justify-between font-mono-label text-[10px] text-on-surface-variant mb-2 uppercase tracking-wider">
<span>Confidence</span>
<span className="text-secondary">92%</span>
</div>
<div className="w-full h-[2px] bg-glass-stroke overflow-hidden relative">
<div className="absolute inset-y-0 left-0 bg-secondary w-[92%] shadow-[0_0_8px_rgba(78,222,163,0.8)]"></div>
</div>
</div>
</div>
{/* Blind Spot (Warning) */}
<div className="p-5 rounded-xl bg-surface/50 border border-error/20 animate-critical flex flex-col gap-4 relative overflow-hidden group">
<div className="absolute inset-0 bg-crimson-glow opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
<div className="absolute top-0 right-0 w-16 h-16 bg-error/10 filter blur-xl rounded-full"></div>
<div className="relative z-10 flex justify-between items-start">
<span className="font-mono-label text-xs text-error bg-error/10 border border-error/20 px-2.5 py-1 rounded shadow-[0_0_10px_rgba(255,180,171,0.1)]">BLIND SPOT: B-04</span>
<div className="flex items-center gap-1.5">
<span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
<span className="font-mono-label text-[10px] text-error tracking-widest uppercase">Critical</span>
</div>
</div>
<p className="relative z-10 font-body-md text-on-surface/90 text-sm leading-relaxed">Competitor AI deployment latency unknown.</p>
<div className="relative z-10 mt-auto pt-4">
<div className="flex justify-between font-mono-label text-[10px] text-error/80 mb-2 uppercase tracking-wider">
<span>Confidence</span>
<span className="text-error">34%</span>
</div>
<div className="w-full h-[2px] bg-glass-stroke overflow-hidden relative">
<div className="absolute inset-y-0 left-0 bg-error w-[34%] shadow-[0_0_8px_rgba(255,180,171,0.8)]"></div>
</div>
</div>
</div>
</div>
</section>
{/* Radar Vis (Spans 4 cols) */}
<section className="glass-card rounded-2xl p-6 md:p-8 col-span-1 md:col-span-4 flex flex-col gap-6 items-center justify-center text-center">
<header className="w-full flex justify-between items-center border-b border-glass-stroke/50 pb-4">
<h3 className="font-mono-label text-[10px] text-on-surface-variant tracking-[0.2em] uppercase">Strategic Vector</h3>
<span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
</header>
<div className="relative w-full aspect-square max-w-[220px] mx-auto py-4">
<svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
{/* Radar Grid Rings */}
<polygon className="radar-grid" fill="none" points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"></polygon>
<polygon className="radar-grid" fill="none" points="50,20 80,35 80,65 50,80 20,65 20,35"></polygon>
<polygon className="radar-grid" fill="none" points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5"></polygon>
{/* Axis Lines */}
<g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
<line x1="50" x2="50" y1="50" y2="5"></line>
<line x1="50" x2="95" y1="50" y2="27.5"></line>
<line x1="50" x2="95" y1="50" y2="72.5"></line>
<line x1="50" x2="50" y1="50" y2="95"></line>
<line x1="50" x2="5" y1="50" y2="72.5"></line>
<line x1="50" x2="5" y1="50" y2="27.5"></line>
</g>
{/* Data Area */}
<polygon className="radar-area" points="50,15 85,30 75,70 50,85 15,65 25,35"></polygon>
{/* Data Points (Glowing) */}
<circle cx="50" cy="15" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
<circle cx="85" cy="30" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
<circle cx="75" cy="70" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
<circle cx="50" cy="85" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
<circle cx="15" cy="65" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
<circle cx="25" cy="35" fill="theme('colors.primary')" filter="drop-shadow(0 0 4px theme('colors.primary'))" r="2"></circle>
</svg>
</div>
<div className="flex gap-6 font-mono-label text-[10px] justify-center flex-wrap uppercase tracking-wider mt-2">
<span className="flex items-center gap-2 text-on-surface/80"><span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_theme('colors.primary')]"></span> Current</span>
<span className="flex items-center gap-2 text-on-surface-variant"><span className="w-1.5 h-1.5 rounded-full border border-glass-stroke"></span> Target</span>
</div>
</section>
</div>
</main>

    </>
  );
}

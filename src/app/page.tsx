import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-[#040509] text-[#e5e1e4]">

{/* Atmospheric Glows */}
<div className="fixed top-[-20%] left-[10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
<div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
<div className="scanner-line"></div>
{/* TopNavBar Shared Component */}
<nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
<div className="bg-glass-fill backdrop-blur-2xl border border-white/10 rounded-full mt-8 mx-auto max-w-fit px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto flex items-center gap-8">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" >flight_takeoff</span>
<span className="font-display text-headline-lg-mobile font-bold text-primary tracking-tight">Preflight</span>
</div>
<ul className="hidden md:flex items-center gap-1 font-body-md text-body-md">
<li>
<Link className="block px-4 py-2 text-primary font-bold border-b-2 border-primary pb-1 hover:bg-glass-fill transition-all duration-300 active:scale-95 transition-transform rounded-t-md" href="#">
                        Dashboard
                    </Link>
</li>
<li>
<Link className="block px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95 transition-transform rounded-md" href="#">
                        Strategy
                    </Link>
</li>
<li>
<Link className="block px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95 transition-transform rounded-md" href="#">
                        Intelligence
                    </Link>
</li>
<li>
<Link className="block px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95 transition-transform rounded-md" href="#">
                        Risk
                    </Link>
</li>
<li>
<Link className="block px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95 transition-transform rounded-md" href="#">
                        Assets
                    </Link>
</li>
</ul>
<div className="flex items-center gap-4 pl-4 border-l border-white/10">
<button className="hidden lg:flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 font-mono-label text-mono-label px-5 py-2 rounded-full hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 active:scale-95">
<span className="material-symbols-outlined text-[16px]">bolt</span> Execute AI
                </button>
<div className="flex gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95">
<span className="material-symbols-outlined text-[20px]">notifications</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-glass-fill transition-all duration-300 active:scale-95">
<span className="material-symbols-outlined text-[20px]">settings</span>
</button>
</div>
<img alt="User profile" className="w-9 h-9 rounded-full border border-white/20 object-cover" data-alt="A highly detailed close up of a glowing futuristic AI optical core, pulsing with blue and white energy lines inside a dark metallic housing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_lacpRNmdmEBzWsy5kMR2Uc8ZOjR2nUakX0boZpSEND6SVDF6ZMZe5KSzPBitiQSQc8ZX5XtjnL5LI_scCOCVg7fLqshxAoWlM5p--It8tsTZ4lo_2sxQGUskdeISwChBTUDUb6YyL4nYndoy69n1g6Q3r3n89u6k-LkLiwXXkyFUK6_k3U_1ZXUpSIj2zGI3L9jVWDAP-Eawlttu-hw9BjbKSrcwIejgNZAFUO5P85aeDRRrU1D7"/>
</div>
</div>
</nav>
<main className="flex-grow relative z-10 pt-48 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-32">
{/* Hero Section */}
<section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 mb-8 shadow-[0_0_15px_rgba(78,222,163,0.15)]">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
<span className="font-mono-label text-mono-label text-secondary tracking-widest font-bold">SYSTEM ONLINE // VER. 4.9.2</span>
</div>
<h1 className="font-display text-[48px] md:text-display font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-primary-fixed to-surface-variant drop-shadow-[0_0_25px_rgba(192,193,255,0.4)]">
                Command Your Future.<br/>Execute With Precision.
            </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12">
                The high-stakes analytics engine built for strategic foresight. Aggregate intelligence, run multi-variable experiments, and crystallize decisions before they happen.
            </p>
<div className="flex flex-col sm:flex-row items-center gap-6">
<button className="relative group bg-primary text-on-primary font-mono-label text-mono-label px-10 py-5 rounded-full overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:shadow-[0_0_40px_rgba(192,193,255,0.6)] font-bold">
<div className="absolute inset-0 bg-white/30 w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out"></div>
<span className="relative flex items-center gap-3">
                        START A DECISION <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</span>
</button>
<button className="text-on-surface-variant hover:text-on-surface font-mono-label text-mono-label px-8 py-4 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                    VIEW SYSTEM LOGS
                </button>
</div>
</section>
{/* Bento Grid Section */}
<section className="w-full">
<div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap">
{/* Card 1: Pre-Flight (Large) */}
<div className="col-span-1 md:col-span-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-gutter relative overflow-hidden group hover:border-primary/40 transition-all duration-500 min-h-[400px] flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
<div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="relative z-10 flex justify-between items-start">
<div>
<div className="w-14 h-14 rounded-xl bg-surface-container/50 backdrop-blur-md flex items-center justify-center border border-white/10 mb-6 shadow-lg">
<span className="material-symbols-outlined text-primary text-[32px] drop-shadow-[0_0_10px_rgba(192,193,255,0.5)]" >rocket_launch</span>
</div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-bold tracking-tight">Pre-Flight Sequence</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Initialize decision parameters, define success metrics, and map constraints before committing resources.</p>
</div>
<span className="font-mono-label text-mono-label text-surface-variant border border-white/20 bg-white/5 px-3 py-1.5 rounded-md font-bold">MOD-01</span>
</div>
{/* Abstract visualization placeholder */}
<div className="relative w-full h-40 mt-8 border-t border-white/10 pt-6 flex items-end gap-3">
<div className="w-1/6 bg-white/10 rounded-t-lg h-[20%] group-hover:h-[40%] group-hover:bg-primary/30 transition-all duration-700 ease-out group-hover:shadow-[0_0_15px_rgba(192,193,255,0.3)]"></div>
<div className="w-1/6 bg-white/10 rounded-t-lg h-[40%] group-hover:h-[70%] group-hover:bg-primary/50 transition-all duration-700 delay-75 ease-out group-hover:shadow-[0_0_15px_rgba(192,193,255,0.4)]"></div>
<div className="w-1/6 bg-white/10 rounded-t-lg h-[10%] group-hover:h-[30%] group-hover:bg-primary/30 transition-all duration-700 delay-100 ease-out group-hover:shadow-[0_0_15px_rgba(192,193,255,0.3)]"></div>
<div className="w-1/6 bg-white/10 rounded-t-lg h-[60%] group-hover:h-[90%] group-hover:bg-primary/70 transition-all duration-700 delay-150 ease-out relative group-hover:shadow-[0_0_25px_rgba(192,193,255,0.6)]">
<div className="absolute -top-8 left-1/2 -translate-x-1/2 font-mono-label text-[12px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-300 drop-shadow-[0_0_8px_rgba(192,193,255,0.8)]">OPTIMAL</div>
</div>
<div className="w-1/6 bg-white/10 rounded-t-lg h-[30%] group-hover:h-[50%] group-hover:bg-primary/40 transition-all duration-700 delay-200 ease-out group-hover:shadow-[0_0_15px_rgba(192,193,255,0.3)]"></div>
<div className="w-1/6 bg-white/10 rounded-t-lg h-[50%] group-hover:h-[80%] group-hover:bg-primary/60 transition-all duration-700 delay-300 ease-out group-hover:shadow-[0_0_15px_rgba(192,193,255,0.5)]"></div>
</div>
</div>
{/* Card 2: Radar (Small) */}
<div className="col-span-1 md:col-span-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-gutter relative overflow-hidden group hover:border-secondary/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div className="w-12 h-12 rounded-xl bg-surface-container/50 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4 shadow-lg">
<span className="material-symbols-outlined text-secondary text-[28px] drop-shadow-[0_0_10px_rgba(78,222,163,0.5)]">radar</span>
</div>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2 font-bold tracking-tight">Signal Radar</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Continuous environmental scanning for early threat detection and market anomalies.</p>
<div className="mt-8 relative w-full h-32 flex items-center justify-center border-t border-white/10 pt-4">
<div className="w-20 h-20 rounded-full border border-secondary/30 flex items-center justify-center relative shadow-[0_0_20px_rgba(78,222,163,0.1)]">
<div className="absolute inset-0 rounded-full border border-secondary/50 animate-ping opacity-30 duration-3000"></div>
<div className="w-10 h-10 rounded-full border border-secondary/80 flex items-center justify-center shadow-[0_0_15px_rgba(78,222,163,0.3)]">
<div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(78,222,163,1)]"></div>
</div>
</div>
</div>
</div>
{/* Card 3: Experiments (Small) */}
<div className="col-span-1 md:col-span-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-gutter relative overflow-hidden group hover:border-tertiary-container/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
<div className="w-12 h-12 rounded-xl bg-surface-container/50 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4 shadow-lg">
<span className="material-symbols-outlined text-tertiary-container text-[28px] drop-shadow-[0_0_10px_rgba(255,81,106,0.5)]">science</span>
</div>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2 font-bold tracking-tight">Experiments</h2>
<p className="font-body-md text-body-md text-on-surface-variant">A/B/n testing in isolated sandbox environments. Validate hypothesis rapidly.</p>
<div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6">
<div className="flex items-center justify-between text-quote-data font-quote-data">
<span className="text-on-surface-variant font-medium">Variant Alpha</span>
<span className="text-secondary font-bold drop-shadow-[0_0_5px_rgba(78,222,163,0.4)]">+14.2%</span>
</div>
<div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[70%] shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
</div>
<div className="flex items-center justify-between text-quote-data font-quote-data mt-2">
<span className="text-on-surface-variant font-medium">Variant Beta</span>
<span className="text-error-container font-bold drop-shadow-[0_0_5px_rgba(147,0,10,0.4)]">-3.8%</span>
</div>
<div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
<div className="h-full bg-error-container w-[30%] shadow-[0_0_10px_rgba(147,0,10,0.8)]"></div>
</div>
</div>
</div>
{/* Card 4: Firewall (Large) */}
<div className="col-span-1 md:col-span-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-gutter relative overflow-hidden group hover:border-white/30 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
<div className="flex flex-col md:flex-row gap-8 items-start h-full">
<div className="flex-1">
<div className="w-14 h-14 rounded-xl bg-surface-container/50 backdrop-blur-md flex items-center justify-center border border-white/10 mb-6 shadow-lg">
<span className="material-symbols-outlined text-on-surface text-[32px] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">shield_locked</span>
</div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-bold tracking-tight">Cognitive Firewall</h2>
<p className="font-body-md text-body-md text-on-surface-variant mb-8">Enforce strict data governance and prevent logic hallucinations with our proprietary verification layer.</p>
{/* Terminal Input Style */}
<div className="relative w-full max-w-sm">
<input className="w-full bg-transparent border-0 border-b border-white/20 text-quote-data font-quote-data text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0 focus:border-primary py-3 px-0 transition-colors" placeholder="Query verification protocol..." type="text"/>
<span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">terminal</span>
</div>
</div>
<div className="w-full md:w-2/5 h-full min-h-[180px] bg-black/40 rounded-xl border border-white/10 p-5 flex flex-col gap-2 font-mono-label text-[11px] text-on-surface-variant/70 overflow-hidden relative shadow-inner">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
<div className="animate-[marquee_12s_linear_infinite] flex flex-col gap-2.5">
<div>&gt; ACCESS REQ: NODE_77</div>
<div className="text-secondary drop-shadow-[0_0_5px_rgba(78,222,163,0.3)]">&gt; AUTHENTICATING... SUCCESS</div>
<div>&gt; SCANNING PAYLOAD...</div>
<div>&gt; CHECKSUM: 0x9F4A2B</div>
<div className="text-tertiary-container drop-shadow-[0_0_5px_rgba(255,81,106,0.3)]">&gt; WARN: ANOMALY DETECTED</div>
<div>&gt; APPLYING FILTER LOGIC</div>
<div>&gt; ROUTING TO QUARANTINE</div>
<div>&gt; ACCESS REQ: NODE_78</div>
<div className="text-secondary drop-shadow-[0_0_5px_rgba(78,222,163,0.3)]">&gt; AUTHENTICATING... SUCCESS</div>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Timeline Section */}
<section className="w-full pb-20">
<div className="text-center mb-20">
<h2 className="font-display text-[32px] md:text-headline-lg text-on-surface mb-4 font-bold drop-shadow-md">The Decision Architecture</h2>
<p className="font-body-md text-body-md text-on-surface-variant">A linear protocol for non-linear problems.</p>
</div>
<div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4">
{/* Glowing Path Line (Desktop) */}
<div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
<div className="h-full bg-gradient-to-r from-primary via-secondary to-primary w-full opacity-70 shadow-[0_0_20px_rgba(192,193,255,0.6)]"></div>
</div>
{/* Step 1 */}
<div className="relative z-10 flex flex-col items-center md:items-center w-full md:w-1/4 text-center group">
<div className="w-24 h-24 rounded-full bg-[#0a0c16] border-2 border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(192,193,255,0.2)] group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary transition-all duration-300">
<span className="material-symbols-outlined text-primary text-[36px] drop-shadow-[0_0_12px_rgba(192,193,255,0.6)]">map</span>
</div>
<h3 className="font-headline-lg-mobile text-[22px] text-on-surface mb-2 font-bold">Map Assumptions</h3>
<p className="font-body-md text-[15px] text-on-surface-variant px-4">Identify unknown variables and core hypotheses.</p>
</div>
{/* Step 2 */}
<div className="relative z-10 flex flex-col items-center md:items-center w-full md:w-1/4 text-center group">
<div className="w-24 h-24 rounded-full bg-[#0a0c16] border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/60 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(192,193,255,0.3)] transition-all duration-300">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[36px]">database</span>
</div>
<h3 className="font-headline-lg-mobile text-[22px] text-on-surface mb-2 font-bold">Gather Evidence</h3>
<p className="font-body-md text-[15px] text-on-surface-variant px-4">Ingest multimodal data streams into the secure enclave.</p>
</div>
{/* Step 3 */}
<div className="relative z-10 flex flex-col items-center md:items-center w-full md:w-1/4 text-center group">
<div className="w-24 h-24 rounded-full bg-[#0a0c16] border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-primary/60 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(192,193,255,0.3)] transition-all duration-300">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[36px]">biotech</span>
</div>
<h3 className="font-headline-lg-mobile text-[22px] text-on-surface mb-2 font-bold">Run Experiments</h3>
<p className="font-body-md text-[15px] text-on-surface-variant px-4">Execute AI-driven simulations against mapped assumptions.</p>
</div>
{/* Step 4 */}
<div className="relative z-10 flex flex-col items-center md:items-center w-full md:w-1/4 text-center group">
<div className="w-24 h-24 rounded-full bg-[#0a0c16] border-2 border-secondary/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(78,222,163,0.25)] group-hover:scale-110 group-hover:bg-secondary/10 group-hover:border-secondary transition-all duration-300">
<span className="material-symbols-outlined text-secondary text-[36px] drop-shadow-[0_0_12px_rgba(78,222,163,0.8)]">verified</span>
</div>
<h3 className="font-headline-lg-mobile text-[22px] text-secondary mb-2 font-bold drop-shadow-[0_0_8px_rgba(78,222,163,0.3)]">Commit Decision</h3>
<p className="font-body-md text-[15px] text-on-surface-variant px-4">Lock in strategy with cryptographically verified logic trails.</p>
</div>
</div>
</section>
</main>
{/* Footer Shared Component */}
<footer className="w-full py-12 border-t border-white/10 bg-transparent relative z-10">
<div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-6">
<div className="text-on-surface font-bold font-mono-label text-mono-label tracking-widest">
                © 2024 PREFLIGHT AI. HIGH-STAKES ANALYTICS ENGINE.
            </div>
<ul className="flex items-center gap-8 font-mono-label text-mono-label">
<li>
<Link className="text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity" href="#">
                        Security
                    </Link>
</li>
<li>
<Link className="text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity" href="#">
                        Terms
                    </Link>
</li>
<li>
<Link className="text-on-surface-variant hover:text-secondary opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2" href="#">
<span className="w-2 h-2 rounded-full bg-secondary inline-block shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span> Latency Status
                    </Link>
</li>
</ul>
</div>
</footer>

    </div>
  );
}
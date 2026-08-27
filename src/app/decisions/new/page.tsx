"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDecision() {
  const [statement, setStatement] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!statement.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/decisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statement, targetCustomer, alternatives }),
      });
      
      const data = await res.json();
      if (data.id) {
        router.push(`/decisions/${data.id}`);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-[#040509] text-[#e5e1e4]">

{/* Atmospheric Background */}
<div className="pulse-bg"></div>
{/* Navigation suppressed due to focused task intent */}
<main className="relative z-10 w-full h-screen flex flex-col justify-center items-center p-margin-mobile md:p-margin-desktop">
{/* Header */}
<div className="w-full max-w-2xl mb-8 flex items-center justify-between">
<div className="flex items-center gap-4">
<Link className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center w-10 h-10 rounded-full glass-card" href="#">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</Link>
<div>
<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">Initiate Analysis</h1>
<p className="font-mono-label text-mono-label text-on-surface-variant mt-2 uppercase">Parameter Definition / New Decision</p>
</div>
</div>
</div>
{/* Form Container */}
<div className="w-full max-w-2xl glass-card rounded-xl p-gutter relative overflow-hidden">
<form className="space-y-8 relative z-10" id="decision-form">
{/* Objective Input */}
<div className="group">
<label className="block font-mono-label text-mono-label text-primary mb-2 uppercase" for="objective">Strategic Objective</label>
<input className="w-full terminal-input font-body-lg text-body-lg py-2" id="objective" placeholder="e.g., Optimize Q3 supply chain routing for European markets" required="" type="text"/>
</div>
{/* Parameters Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap">
<div className="group">
<label className="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase" for="risk-tolerance">Risk Tolerance</label>
<select className="w-full terminal-input font-body-md text-body-md py-2 appearance-none bg-transparent" id="risk-tolerance">
<option className="bg-surface-container" value="low">Low (Conservative)</option>
<option className="bg-surface-container" selected="" value="medium">Medium (Balanced)</option>
<option className="bg-surface-container" value="high">High (Aggressive)</option>
</select>
</div>
<div className="group">
<label className="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase" for="time-horizon">Time Horizon</label>
<select className="w-full terminal-input font-body-md text-body-md py-2 appearance-none bg-transparent" id="time-horizon">
<option className="bg-surface-container" value="short">Short-term (0-3 Months)</option>
<option className="bg-surface-container" selected="" value="medium">Medium-term (3-12 Months)</option>
<option className="bg-surface-container" value="long">Long-term (1-5 Years)</option>
</select>
</div>
</div>
{/* Data Sources Input */}
<div className="group">
<label className="block font-mono-label text-mono-label text-on-surface-variant mb-2 uppercase" for="data-sources">Data Ingestion Endpoints (Optional)</label>
<textarea className="w-full terminal-input font-quote-data text-quote-data py-2 resize-none" id="data-sources" placeholder="Provide URLs or connection strings for bespoke datasets..." rows="2"></textarea>
</div>
{/* Action Bar */}
<div className="pt-4 flex justify-end">
<button className="bg-primary text-on-primary font-mono-label text-mono-label uppercase px-8 py-4 rounded-lg flex items-center gap-2 hover:bg-primary-fixed transition-colors shadow-indigo-glow" id="execute-btn" type="button">
<span className="material-symbols-outlined" data-icon="rocket_launch" >rocket_launch</span>
                        Execute AI
                    </button>
</div>
</form>
</div>
</main>
{/* AI Loading Overlay */}
<div className="fixed inset-0 z-50 bg-surface-deep/90 backdrop-blur-xl flex-col items-center justify-center p-margin-desktop" id="ai-overlay">
<div className="ai-scanner"></div>
<div className="max-w-2xl w-full text-center relative">
{/* Pulsing Orb */}
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[64px] animate-pulse"></div>
<div className="relative z-10 flex flex-col items-center gap-8">
<span className="material-symbols-outlined text-primary text-6xl animate-spin" data-icon="model_training" >model_training</span>
<h2 className="font-display text-display text-on-surface">Processing</h2>
<div className="w-full h-32 glass-card rounded-lg p-4 overflow-hidden text-left relative">
<div className="font-quote-data text-quote-data text-secondary flex flex-col gap-2 absolute bottom-4 left-4 right-4" id="terminal-log">
{/* JS injected logs */}
</div>
</div>
</div>
</div>
</div>
<script>
        document.addEventListener('DOMContentLoaded', () => {
            const executeBtn = document.getElementById('execute-btn');
            const overlay = document.getElementById('ai-overlay');
            const terminalLog = document.getElementById('terminal-log');
            
            const logMessages = [
                "> INITIATING PREFLIGHT PROTOCOL...",
                "> PARSING STRATEGIC OBJECTIVE...",
                "> ALLOCATING COMPUTE CLUSTERS...",
                "> INGESTING MARKET SENTIMENT DATA...",
                "> RUNNING MONTE CARLO SIMULATIONS (N=10,000)...",
                "> OPTIMIZING DECISION TREE...",
                "> GENERATING FORECAST MODELS..."
            ];

            executeBtn.addEventListener('click', () => {
                overlay.classList.add('active');
                
                let messageIndex = 0;
                terminalLog.innerHTML = ''; // clear

                const interval = setInterval(() => {
                    if (messageIndex < logMessages.length) {
                        const p = document.createElement('p');
                        p.textContent = logMessages[messageIndex];
                        p.style.opacity = '0';
                        terminalLog.appendChild(p);
                        
                        // Fade in
                        setTimeout(() => p.style.opacity = '1', 50);
                        
                        // Keep only last 4 messages visible for terminal effect
                        if (terminalLog.children.length > 4) {
                            terminalLog.removeChild(terminalLog.firstChild);
                        }
                        
                        messageIndex++;
                    } else {
                        clearInterval(interval);
                        // Simulate redirect or completion
                        setTimeout(() => {
                            const p = document.createElement('p');
                            p.textContent = "> ANALYSIS COMPLETE. READY.";
                            p.className = "text-primary";
                            terminalLog.appendChild(p);
                            if (terminalLog.children.length > 4) {
                                terminalLog.removeChild(terminalLog.firstChild);
                            }
                        }, 500);
                    }
                }, 800);
            });
        });
    </script>

    </div>
  );
}
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldAlert, Target, ShieldQuestion } from "lucide-react";

export default function StaticDemoDashboard() {
  // Hardcoded mock data so the demo works instantly without database or AI
  const decision = {
    id: "demo-decision-123",
    statement: "Should we build an AI bookkeeping app for small independent restaurants?",
    targetCustomer: "Independent restaurant owners with $1M-$5M revenue",
    status: "analyzing",
    readinessScore: 32,
    assumptions: [
      {
        id: "a1",
        statement: "Restaurant owners will trust AI to categorize their daily expenses without manual review.",
        category: "user_behavior",
        importance: "critical",
        status: "uncertain",
        isBlindSpot: false,
        reasoning: "Bookkeeping requires high precision. Trust in AI for this specific financial task is unproven."
      },
      {
        id: "a2",
        statement: "Owners currently spend more than 10 hours a month on bookkeeping.",
        category: "pain_point",
        importance: "high",
        status: "supported",
        isBlindSpot: false,
        reasoning: "Based on general SMB data, bookkeeping is a major time sink."
      },
      {
        id: "a3",
        statement: "Most restaurants use legacy POS systems that do not integrate easily with modern APIs.",
        category: "technical",
        importance: "critical",
        status: "uncertain",
        isBlindSpot: true,
        reasoning: "If we cannot ingest data automatically, the product offers no value. POS fragmentation is notoriously high in hospitality."
      }
    ]
  };

  const blindSpots = decision.assumptions.filter(a => a.isBlindSpot);
  const coreAssumptions = decision.assumptions.filter(a => !a.isBlindSpot);
  
  const criticalAssumptions = [...coreAssumptions].sort((a, b) => {
    const imp = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
    return (imp[b.importance as keyof typeof imp] || 0) - (imp[a.importance as keyof typeof imp] || 0);
  });

  const getReadinessColor = (score: number) => {
    if (score < 40) return "text-red-600 bg-red-50 border-red-100";
    if (score < 60) return "text-orange-600 bg-orange-50 border-orange-100";
    if (score < 75) return "text-yellow-600 bg-yellow-50 border-yellow-100";
    if (score < 90) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    return "text-blue-600 bg-blue-50 border-blue-100";
  };

  const getReadinessLabel = (score: number) => {
    if (score < 40) return "NOT READY";
    if (score < 60) return "WEAK EVIDENCE";
    if (score < 75) return "DEVELOPING";
    if (score < 90) return "STRONG BASIS";
    return "HIGH CONFIDENCE";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'supported': return 'bg-emerald-100 text-emerald-800';
      case 'contradicted': return 'bg-red-100 text-red-800';
      case 'uncertain': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Preflight</span>
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">STATIC DEMO</span>
          </Link>
          <div className="flex gap-4">
            <button className="text-sm font-medium text-slate-400 py-2 px-3 cursor-not-allowed">Evidence Vault</button>
            <button className="text-sm font-medium text-slate-400 py-2 px-3 cursor-not-allowed">Business Radar</button>
            <button className="text-sm font-medium text-slate-400 py-2 px-3 cursor-not-allowed">Experiments</button>
            <button className="text-sm font-medium bg-slate-200 text-slate-400 py-2 px-4 rounded-lg cursor-not-allowed">Decision Firewall</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-12">
          <div className="max-w-3xl">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">The Decision</h4>
            <h1 className="text-3xl font-bold leading-tight mb-4">{decision.statement}</h1>
            <p className="text-slate-500">
              Target: <span className="text-slate-700 font-medium">{decision.targetCustomer || 'Not specified'}</span> • 
              Status: <span className="text-slate-700 font-medium">{decision.status}</span>
            </p>
          </div>
          
          {/* Readiness Score Card */}
          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${getReadinessColor(decision.readinessScore)} min-w-[200px]`}>
            <div className="text-5xl font-black mb-1">{decision.readinessScore}</div>
            <div className="text-sm font-bold uppercase tracking-widest">{getReadinessLabel(decision.readinessScore)}</div>
          </div>
        </div>

        {/* Alerts / Blindspots */}
        {blindSpots.length > 0 && (
          <div className="mb-12 bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-orange-800 mb-4">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="font-bold text-lg">AI Blind Spot Detection</h2>
            </div>
            <p className="text-orange-700 mb-6 text-sm">
              The AI identified {blindSpots.length} critical assumption(s) you didn't consider that could derail this decision.
            </p>
            <div className="grid gap-4">
              {blindSpots.map(bs => (
                <div key={bs.id} className="bg-white rounded-xl p-5 border border-orange-100 shadow-sm flex items-start gap-4">
                  <div className="mt-1 bg-red-100 text-red-600 p-2 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{bs.statement}</h3>
                    <p className="text-slate-600 text-sm">{bs.reasoning}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assumptions Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-slate-400" />
              Core Assumptions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {criticalAssumptions.map(assumption => (
              <div key={assumption.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getStatusColor(assumption.status)}`}>
                    {assumption.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">
                    {assumption.importance}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 leading-snug mb-3">
                  {assumption.statement}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">
                  {assumption.reasoning}
                </p>
                <div className="pt-4 border-t border-slate-100 mt-auto flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-400 uppercase">{assumption.category.replace('_', ' ')}</span>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-not-allowed opacity-50">
                    Add Evidence <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

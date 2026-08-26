import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldAlert, Target, ShieldQuestion } from "lucide-react";

const prisma = new PrismaClient();

export default async function DecisionDashboard({ params }: { params: { id: string } }) {
  const decision = await prisma.decision.findUnique({
    where: { id: params.id },
    include: {
      assumptions: true,
    }
  });

  if (!decision) {
    notFound();
  }

  const blindSpots = decision.assumptions.filter((a: any) => a.isBlindSpot);
  const coreAssumptions = decision.assumptions.filter((a: any) => !a.isBlindSpot);
  
  // Find top critical assumptions
  const criticalAssumptions = [...coreAssumptions].sort((a: any, b: any) => {
    const imp = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 };
    return (imp[b.importance as keyof typeof imp] || 0) - (imp[a.importance as keyof typeof imp] || 0);
  }).slice(0, 3);

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
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Preflight</span>
          </div>
          <div className="flex gap-4">
            <Link href={`/decisions/${decision.id}/evidence`} className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors">
              Evidence Vault
            </Link>
            <Link href={`/decisions/${decision.id}/radar`} className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors">
              Business Radar
            </Link>
            <Link href={`/decisions/${decision.id}/experiments`} className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors">
              Experiments
            </Link>
            <Link href={`/decisions/${decision.id}/firewall`} className="text-sm font-medium bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Decision Firewall
            </Link>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Assumptions */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" /> Core Assumptions
                </h2>
                <span className="text-sm text-slate-500 font-medium">{coreAssumptions.length} total</span>
              </div>
              
              <div className="space-y-4">
                {coreAssumptions.map((assumption: any) => (
                  <div key={assumption.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">{assumption.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase ${
                          assumption.importance === 'critical' ? 'bg-purple-100 text-purple-800' :
                          assumption.importance === 'high' ? 'bg-orange-100 text-orange-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {assumption.importance}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase ${getStatusColor(assumption.status)}`}>
                          {assumption.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{assumption.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <div>
                        <strong className="text-slate-900 block mb-1">To Prove:</strong>
                        <span className="text-slate-600">{assumption.proveCondition}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">To Disprove:</strong>
                        <span className="text-slate-600">{assumption.disproveCondition}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Blind Spots & Critical */}
          <div className="space-y-8">
            <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Blind Spots
              </h2>
              <div className="space-y-4">
                {blindSpots.map((spot: any) => (
                  <div key={spot.id} className="bg-white border border-red-100 rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-red-900 text-sm mb-1">{spot.title}</h3>
                    <p className="text-slate-600 text-xs">{spot.description}</p>
                  </div>
                ))}
                {blindSpots.length === 0 && (
                  <p className="text-sm text-red-700">No major blind spots detected.</p>
                )}
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" /> Critical Uncertainties
              </h2>
              <p className="text-sm text-slate-500 mb-4">Resolving these assumptions will move the readiness score the most.</p>
              
              <div className="space-y-3">
                {criticalAssumptions.map((a: any, i: number) => (
                  <div key={a.id} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div className="text-sm font-medium text-slate-700">{a.title}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link href={`/decisions/${decision.id}/experiments`} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-colors">
                  Design Experiment <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}

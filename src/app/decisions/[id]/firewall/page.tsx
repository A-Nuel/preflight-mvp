import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertTriangle, HelpCircle, Play, Ban } from "lucide-react";

const prisma = new PrismaClient();

export default async function DecisionFirewall({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decision = await prisma.decision.findUnique({
    where: { id },
    include: {
      assumptions: true,
      experiments: {
        include: { result: true }
      }
    }
  });

  if (!decision) notFound();

  const getRecommendationStyle = (rec: string | null) => {
    if (!rec) return { color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-200", icon: <HelpCircle className="w-12 h-12" /> };
    if (rec.includes("GO") && !rec.includes("NO")) return { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", icon: <Play className="w-12 h-12" /> };
    if (rec.includes("NO-GO") || rec.includes("PIVOT")) return { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", icon: <Ban className="w-12 h-12" /> };
    return { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", icon: <AlertTriangle className="w-12 h-12" /> }; // Wait / Validate More
  };

  const style = getRecommendationStyle(decision.recommendation);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 pb-20 selection:bg-blue-500/30">
      <nav className="border-b border-slate-800 px-8 py-4 sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/decisions/${decision.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4" /> FIREWALL ACTIVE
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 pt-16">
        <div className="text-center mb-16">
          <h4 className="text-slate-500 uppercase tracking-widest text-sm font-bold mb-4">Final Analysis</h4>
          <h1 className="text-4xl font-bold text-white mb-2">{decision.statement}</h1>
        </div>

        <div className={`rounded-3xl p-10 flex flex-col items-center justify-center text-center border-2 mb-12 relative overflow-hidden ${style.bg} ${style.border}`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className={`mb-6 p-4 rounded-full bg-white/50 backdrop-blur-sm ${style.color}`}>
            {style.icon}
          </div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2">System Recommendation</h2>
          <div className={`text-6xl font-black tracking-tight mb-6 ${style.color}`}>
            {decision.recommendation || "VALIDATE MORE"}
          </div>
          <p className="text-slate-800 text-lg max-w-2xl leading-relaxed font-medium">
            {decision.recommendationReasoning || "Insufficient data to make a recommendation."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Biggest Weakness</h3>
            <p className="text-white text-lg">
              {decision.assumptions.find((a: any) => a.status === 'contradicted' || (a.status === 'uncertain' && a.importance === 'critical'))?.title || "No major weaknesses detected."}
            </p>
          </div>
          
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <h3 className="text-slate-400 uppercase text-xs font-bold tracking-wider mb-4">Readiness Score</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white leading-none">{decision.readinessScore}</span>
              <span className="text-slate-500 pb-1">/ 100</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Commit to Decision
          </button>
        </div>
      </main>
    </div>
  );
}

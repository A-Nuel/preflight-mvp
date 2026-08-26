import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Radar, Zap, AlertCircle, TrendingUp, AlertOctagon } from "lucide-react";

const prisma = new PrismaClient();

export default async function BusinessRadar({ params }: { params: { id: string } }) {
  const decision = await prisma.decision.findUnique({
    where: { id: params.id },
    include: {
      signals: true
    }
  });

  if (!decision) notFound();

  const crossSignals = decision.signals.filter(s => s.isCrossSignal);
  const otherSignals = decision.signals.filter(s => !s.isCrossSignal);

  const getIconForType = (type: string) => {
    switch (type) {
      case 'RISK': return <AlertOctagon className="w-5 h-5 text-red-500" />;
      case 'OPPORTUNITY': return <Zap className="w-5 h-5 text-emerald-500" />;
      case 'EMERGING_PATTERN': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/decisions/${decision.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Radar className="w-4 h-4" /> Radar Active
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Business Radar</h1>
          <p className="text-slate-500">Continuous AI monitoring of customer signals, risks, and emerging patterns.</p>
        </div>

        {/* Cross Signals Highlight (You may not be looking at this) */}
        {crossSignals.length > 0 && (
          <section className="mb-12">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> You may not be looking at this
            </h2>
            <div className="grid gap-6">
              {crossSignals.map(signal => (
                <div key={signal.id} className="bg-indigo-900 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-indigo-500 text-indigo-50 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
                        Cross-Signal Pattern
                      </span>
                      <span className="text-indigo-200 text-sm">{signal.observations} observations</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{signal.title}</h3>
                    <p className="text-indigo-100 text-lg leading-relaxed mb-6 max-w-3xl">
                      {signal.explanation}
                    </p>
                    <div className="bg-indigo-950/50 border border-indigo-700/50 rounded-xl p-4 inline-block">
                      <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider block mb-1">Recommended Action</span>
                      <span className="text-white font-medium">{signal.recommendedAction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Signals */}
        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Detected Signals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherSignals.map(signal => (
              <div key={signal.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      {getIconForType(signal.type)}
                    </div>
                    <h3 className="font-bold text-slate-900">{signal.title}</h3>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded font-semibold uppercase ${
                    signal.importance === 'critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {signal.importance}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-6">{signal.explanation}</p>
                <div className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100">
                  <strong className="text-slate-900">Action:</strong> <span className="text-slate-700">{signal.recommendedAction}</span>
                </div>
              </div>
            ))}
            {otherSignals.length === 0 && crossSignals.length === 0 && (
              <div className="col-span-2 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500">No active signals detected. Connect data sources to begin monitoring.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FlaskConical, CheckCircle2, Play, AlertCircle } from "lucide-react";

const prisma = new PrismaClient();

export default async function Experiments({ params }: { params: { id: string } }) {
  const decision = await prisma.decision.findUnique({
    where: { id: params.id },
    include: {
      experiments: {
        include: { result: true }
      }
    }
  });

  if (!decision) notFound();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/decisions/${decision.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-medium bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <FlaskConical className="w-4 h-4" /> Generate New Experiment
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Experiments</h1>
          <p className="text-slate-500">Design and execute experiments to systematically reduce uncertainty.</p>
        </div>

        <div className="space-y-8">
          {decision.experiments.map((exp: any) => (
            <div key={exp.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="border-b border-slate-100 bg-slate-50 p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-slate-900">{exp.name}</h2>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                      exp.status === 'COMPLETE' ? 'bg-emerald-100 text-emerald-800' :
                      exp.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {exp.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">Why it matters: {exp.whyItMatters}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span><strong className="text-slate-700">Cost:</strong> {exp.costEstimate}</span>
                  <span><strong className="text-slate-700">Time:</strong> {exp.timeEstimate}</span>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Hypothesis</h4>
                    <p className="text-slate-800 bg-slate-50 p-4 rounded-lg border border-slate-100">{exp.hypothesis}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Execution</h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                      <li><strong>Who:</strong> {exp.whoToTest}</li>
                      <li><strong>Steps:</strong> {exp.steps}</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                   <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Thresholds</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-emerald-900">
                        <strong>Success:</strong> {exp.successThreshold}
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-red-900">
                        <strong>Failure:</strong> {exp.failureThreshold}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Decision Impact</h4>
                    <p className="text-slate-700 text-sm">{exp.changeCondition}</p>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              {exp.result ? (
                <div className="bg-slate-900 text-white p-6 border-t border-slate-800">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Experiment Results
                  </h3>
                  <p className="text-slate-300 mb-6">{exp.result.resultData}</p>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Readiness Delta</div>
                      <div className="text-2xl font-bold flex items-center gap-3">
                        <span className="text-slate-500 line-through">{exp.result.readinessBefore}</span>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                        <span className="text-emerald-400">{exp.result.readinessAfter}</span>
                      </div>
                    </div>
                    <div className="col-span-2 bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">AI Explanation</div>
                      <div className="text-sm text-slate-300">{exp.result.explanation}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                  <button className="flex items-center gap-2 text-sm font-medium bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    Enter Results
                  </button>
                </div>
              )}
            </div>
          ))}

          {decision.experiments.length === 0 && (
             <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <FlaskConical className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No experiments designed</h3>
              <p className="text-sm text-slate-500">Generate an experiment to test your most critical assumption.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

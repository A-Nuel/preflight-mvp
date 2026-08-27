import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Plus } from "lucide-react";

const prisma = new PrismaClient();

export default async function EvidenceVault({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decision = await prisma.decision.findUnique({
    where: { id },
    include: {
      evidence: {
        include: {
          assumptionLinks: {
            include: { assumption: true }
          }
        }
      }
    }
  });

  if (!decision) notFound();

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-emerald-100 text-emerald-800';
      case 'moderate': return 'bg-blue-100 text-blue-800';
      case 'weak': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'supports': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'contradicts': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-slate-600 bg-slate-50 border-slate-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/decisions/${decision.id}`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-sm font-medium bg-slate-900 text-white py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
              <Plus className="w-4 h-4" /> Add Evidence
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Evidence Vault</h1>
          <p className="text-slate-500">Track and evaluate facts, claims, and observations related to your decision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decision.evidence.map((ev: any) => (
            <div key={ev.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getClassificationColor(ev.classification)}`}>
                  {ev.classification}
                </div>
                <div className="flex gap-2">
                  <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-semibold">{ev.nature}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-slate-900 text-sm leading-relaxed mb-4">"{ev.content}"</p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <FileText className="w-3.5 h-3.5" />
                  <span className="truncate">{ev.source}</span>
                </div>
                
                {ev.assumptionLinks.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Linked to:</p>
                    {ev.assumptionLinks.map((link: any) => (
                      <div key={link.assumptionId} className="text-xs text-blue-700 bg-blue-50 px-2 py-1.5 rounded truncate border border-blue-100">
                        {link.assumption.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {decision.evidence.length === 0 && (
            <div className="col-span-3 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No evidence yet</h3>
              <p className="text-sm text-slate-500">Add customer interviews, data, or market research to validate assumptions.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

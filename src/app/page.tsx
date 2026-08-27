import Link from "next/link";
import { ArrowRight, Radar, ShieldAlert, FlaskConical, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-semibold tracking-tight">Preflight</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/demo" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Explore Demo
          </Link>
          <Link 
            href="/decisions/new" 
            className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-sm"
          >
            Start a decision
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 pt-24 pb-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Evidence-Gated Decision Intelligence
          </div>
          <h1 className="text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Before you build it, find out what must be true.
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
            AI that stress-tests your business decisions, finds what you're missing, and tells you what to validate next. Stop guessing. Start proving.
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/decisions/new" 
              className="inline-flex items-center justify-center gap-2 text-base font-medium bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Start a decision <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/demo" 
              className="inline-flex items-center justify-center gap-2 text-base font-medium bg-white text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-all shadow-sm border border-slate-200"
            >
              Explore Static Demo
            </Link>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-32">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pre-Flight</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Identify assumptions, critical uncertainties, and blind spots before committing resources.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
              <Radar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Business Radar</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Monitor customer signals and detect non-obvious patterns in your data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6 text-amber-600">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Experiments</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate the highest-value experiments to reduce uncertainty rapidly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Decision Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Recalculate decision readiness as new evidence arrives. Know when to GO.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

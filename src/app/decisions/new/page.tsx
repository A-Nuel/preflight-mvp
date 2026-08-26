"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

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
      // Typically, we would hit our API here to create the decision
      // For this showcase MVP, we can simulate an API call that seeds data
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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-8 shadow-sm rounded-2xl border border-slate-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">What are you deciding?</h2>
            <p className="text-slate-500">Define your decision to begin the Pre-Flight analysis.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-slate-700 mb-2">
                The Decision
              </label>
              <textarea
                id="statement"
                rows={3}
                placeholder="e.g., Should I launch an AI bookkeeping platform for small restaurants?"
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400"
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="targetCustomer" className="block text-sm font-medium text-slate-700 mb-2">
                Target Customer <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="targetCustomer"
                placeholder="e.g., Independent restaurant owners with $1M-$5M revenue"
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400"
                value={targetCustomer}
                onChange={(e) => setTargetCustomer(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="alternatives" className="block text-sm font-medium text-slate-700 mb-2">
                What are your alternatives? <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                id="alternatives"
                placeholder="e.g., Build a generic AI tool, or do nothing"
                className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400"
                value={alternatives}
                onChange={(e) => setAlternatives(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !statement.trim()}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Decision...
                  </>
                ) : (
                  <>
                    Analyze Decision
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { GoogleGenAI } from '@google/genai';

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

// We will use Gemini natively with structured outputs, or a fallback.
export async function preflightAnalysis(decisionStatement: string, context: string) {
  const ai = getClient();
  const prompt = `Analyze the following business decision: "${decisionStatement}"\nContext: ${context}\n\nIdentify assumptions, blind spots, failure modes, and provide a readiness score based on the available context. Be intellectually honest. Do not fabricate evidence. You must return ONLY a JSON object.`;
  
  // Since we don't have the Vercel AI SDK, we'll use Gemini's native structured output or just parse JSON.
  // For robustness in this MVP, we will request JSON and parse it.
  
  const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
  });

  const text = response.text || "{}";
  return JSON.parse(text);
}

export async function analyzeEvidence(evidenceText: string, existingAssumptions: { id: string, title: string }[]) {
  const ai = getClient();
  const prompt = `Analyze this evidence: "${evidenceText}"\n\nExisting assumptions:\n${existingAssumptions.map(a => `- [${a.id}] ${a.title}`).join('\n')}\n\nClassify it, determine its nature (FACT vs CLAIM vs INFERENCE), assess its strength, and link it to relevant assumption IDs. Return ONLY JSON.`;
  
  const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
}

export async function radarAnalysis(signalsData: string) {
  const ai = getClient();
  const prompt = `Analyze the following business data/signals: "${signalsData}"\n\nIdentify risks, opportunities, emerging patterns, and customer friction. You MUST identify at least one compelling cross-signal pattern. Return ONLY JSON.`;
  
  const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
}

export async function generateExperiment(assumptionTitle: string, assumptionDesc: string) {
  const ai = getClient();
  const prompt = `Design a practical, high-ROI experiment to validate this critical business assumption:\nTitle: ${assumptionTitle}\nDescription: ${assumptionDesc}\n\nThe experiment should optimize for maximum information gained per unit of time/cost. Return ONLY JSON.`;
  
  const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
}

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // 1. Clean database
    await prisma.outcome.deleteMany();
    await prisma.experimentResult.deleteMany();
    await prisma.experiment.deleteMany();
    await prisma.signal.deleteMany();
    await prisma.evidenceAssumption.deleteMany();
    await prisma.evidence.deleteMany();
    await prisma.assumption.deleteMany();
    await prisma.decision.deleteMany();
    await prisma.user.deleteMany();

    // 2. Create mock user
    const user = await prisma.user.create({
      data: {
        email: "demo@example.com",
        name: "Demo Founder",
      }
    });

    // 3. Create Demo Decision
    const decision = await prisma.decision.create({
      data: {
        statement: "Should I launch an AI bookkeeping platform for small independent restaurants?",
        targetCustomer: "Independent restaurant owners with $1M-$5M annual revenue",
        alternatives: "Stick to generic bookkeeping tools, or build for another niche",
        readinessScore: 71, // Updated readiness after experiment
        status: "READY",
        recommendation: "NO-GO (PIVOT)",
        recommendationReasoning: "While the problem is real, the willingness to switch CPAs and trust AI is too low. However, selling this AS a tool to their existing CPAs shows strong promise.",
        userId: user.id,
      }
    });

    // 4. Create Assumptions
    const assumptions = await prisma.assumption.createManyAndReturn({
      data: [
        {
          decisionId: decision.id,
          title: "High Pain Point",
          description: "Restaurant owners spend over 10 hours a week on bookkeeping and hate it.",
          importance: "high",
          confidence: 80,
          evidenceStrength: "moderate",
          status: "supported",
          proveCondition: "5+ owners confirm spending >10h/week on books.",
          disproveCondition: "Owners outsource it completely and don't care.",
          isBlindSpot: false
        },
        {
          decisionId: decision.id,
          title: "Willingness to Trust AI",
          description: "Restaurant owners will trust an AI system to categorize expenses and calculate taxes without a human CPA.",
          importance: "critical",
          confidence: 20,
          evidenceStrength: "weak",
          status: "contradicted", // Updated post-experiment
          proveCondition: "3 out of 5 interviewed owners would connect their bank to an AI pilot.",
          disproveCondition: "Owners explicitly refuse AI due to fear of IRS audits.",
          isBlindSpot: false
        }
      ]
    });

    // 5. Create Evidence
    await prisma.evidence.create({
      data: {
        decisionId: decision.id,
        source: "Customer Interview - Joe (Luigi's Pizza)",
        content: "I pay my CPA $400 a month. He's slow, but if the IRS comes knocking, he's the one who goes to jail, not me. I wouldn't trust a computer with that liability.",
        type: "interview",
        classification: "contradicts",
        nature: "USER CLAIM",
        strength: "strong",
        assumptionLinks: {
          create: [
            { assumptionId: assumptions.find(a => a.title === "Willingness to Trust AI")!.id }
          ]
        }
      }
    });

    // 6. Create Signals
    await prisma.signal.create({
      data: {
        decisionId: decision.id,
        title: "The Ghost CPA Pattern",
        explanation: "Customers who complain the most about bookkeeping time are also the ones who refuse to fire their CPAs due to audit fear. Pain does not equal willingness to switch.",
        observations: 6,
        importance: "critical",
        confidence: 90,
        type: "EMERGING_PATTERN",
        recommendedAction: "Pivot positioning: Sell this AS a tool for their CPA.",
        isCrossSignal: true
      }
    });

    // 7. Create Experiment and Result
    const experiment = await prisma.experiment.create({
      data: {
        decisionId: decision.id,
        name: "The 'Fake Door' CPA Replacement Pilot",
        whyItMatters: "If they won't fire their CPA, the product has no go-to-market motion.",
        hypothesis: "Restaurant owners will agree to a free 1-month pilot replacing their CPA if we guarantee audit protection.",
        objective: "Measure willingness to hand over financial credentials to a software-first solution.",
        whoToTest: "12 restaurant owners in local area",
        steps: "1. Pitch the AI replacing their CPA. 2. Ask for bank read-access. 3. See if they convert.",
        interviewQuestions: "What is your biggest fear with taxes? If we messed up, who is responsible?",
        successThreshold: "5 out of 12 agree to pilot.",
        failureThreshold: "Fewer than 3 agree.",
        changeCondition: "If it fails, we pivot to selling to CPAs instead of replacing them.",
        costEstimate: "$500 (ads/coffee)",
        timeEstimate: "1 week",
        status: "COMPLETE"
      }
    });

    await prisma.experimentResult.create({
      data: {
        experimentId: experiment.id,
        resultData: "We interviewed 12 restaurant owners. Only 1 agreed to the pilot. 9 explicitly cited 'liability' and 'trusting my guy' as reasons they wouldn't switch.",
        extractedEvidence: "Strong contradiction of 'Willingness to Trust AI' assumption.",
        readinessBefore: 38,
        readinessAfter: 71,
        explanation: "The experiment decisively proved the core assumption wrong. Uncertainty has been reduced significantly, hence the higher readiness score to make a pivot decision."
      }
    });

    return NextResponse.redirect(new URL(`/decisions/${decision.id}`, req.url));

  } catch (error) {
    console.error("Failed to seed demo data:", error);
    return NextResponse.json({ error: "Failed to seed demo data" }, { status: 500 });
  }
}

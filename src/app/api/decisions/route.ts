import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { preflightAnalysis } from "@/lib/ai";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { statement, targetCustomer, alternatives } = body;

    if (!statement) {
      return NextResponse.json({ error: "Statement is required" }, { status: 400 });
    }

    // 1. Create the decision in the database
    const decision = await prisma.decision.create({
      data: {
        statement,
        targetCustomer,
        alternatives,
        // Using a dummy user for the MVP if auth isn't hooked up
        user: {
          connectOrCreate: {
            where: { email: "founder@example.com" },
            create: { email: "founder@example.com", name: "Founder" }
          }
        }
      }
    });

    // 2. We can either do the AI analysis synchronously or asynchronously.
    // For MVP, synchronous ensures the user sees results immediately.
    // In production, this would be a background job.
    
    // Provide context to AI
    const context = `Target Customer: ${targetCustomer || 'Unknown'}\nAlternatives: ${alternatives || 'None provided'}`;
    
    const analysis = await preflightAnalysis(statement, context);

    // 3. Save AI results to the database
    if (analysis) {
      await prisma.decision.update({
        where: { id: decision.id },
        data: {
          readinessScore: analysis.readinessScore || 0,
          recommendationReasoning: analysis.readinessExplanation
        }
      });

      // Save assumptions
      if (analysis.assumptions && analysis.assumptions.length > 0) {
        await prisma.assumption.createMany({
          data: analysis.assumptions.map((a: any) => ({
            decisionId: decision.id,
            title: a.title,
            description: a.description,
            importance: a.importance,
            confidence: a.confidence,
            evidenceStrength: a.evidenceStrength,
            status: a.status,
            proveCondition: a.proveCondition,
            disproveCondition: a.disproveCondition,
            isBlindSpot: false
          }))
        });
      }

      // Save blind spots
      if (analysis.blindSpots && analysis.blindSpots.length > 0) {
        await prisma.assumption.createMany({
          data: analysis.blindSpots.map((b: any) => ({
            decisionId: decision.id,
            title: b.title,
            description: b.description,
            importance: b.importance,
            confidence: 0,
            evidenceStrength: 'none',
            status: 'uncertain',
            proveCondition: '',
            disproveCondition: '',
            isBlindSpot: true
          }))
        });
      }
    }

    return NextResponse.json({ id: decision.id });
  } catch (error) {
    console.error("Error creating decision:", error);
    return NextResponse.json({ error: "Failed to create decision" }, { status: 500 });
  }
}

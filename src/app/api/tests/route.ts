import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status ? { status: status as any } : {};
    const tests = await prisma.test.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, status, hypothesis, category, platform, vertical,
      successMetric, secondaryMetric, victoryThreshold,
      budget, duration, baseline, controlledVariables,
      result, nextStep, analysis, startDate, closeDate,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    const test = await prisma.test.create({
      data: {
        title, status, hypothesis, category, platform, vertical,
        successMetric, secondaryMetric, victoryThreshold,
        budget, duration, baseline, controlledVariables,
        result, nextStep, analysis,
        startDate: startDate ? new Date(startDate) : undefined,
        closeDate: closeDate ? new Date(closeDate) : undefined,
      },
    });

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create test" },
      { status: 500 }
    );
  }
}

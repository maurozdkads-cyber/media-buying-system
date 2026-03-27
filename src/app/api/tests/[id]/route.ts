import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const test = await prisma.test.findUnique({
      where: { id },
      include: {
        trackingEntries: { orderBy: { date: "desc" } },
        kbEntries: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json(test);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch test" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title, status, hypothesis, category, platform, vertical,
      successMetric, secondaryMetric, victoryThreshold,
      budget, duration, baseline, controlledVariables,
      result, nextStep, analysis, startDate, closeDate,
    } = body;

    const data: Record<string, any> = {};
    if (title !== undefined) data.title = title;
    if (status !== undefined) data.status = status;
    if (hypothesis !== undefined) data.hypothesis = hypothesis;
    if (category !== undefined) data.category = category;
    if (platform !== undefined) data.platform = platform;
    if (vertical !== undefined) data.vertical = vertical;
    if (successMetric !== undefined) data.successMetric = successMetric;
    if (secondaryMetric !== undefined) data.secondaryMetric = secondaryMetric;
    if (victoryThreshold !== undefined) data.victoryThreshold = victoryThreshold;
    if (budget !== undefined) data.budget = budget;
    if (duration !== undefined) data.duration = duration;
    if (baseline !== undefined) data.baseline = baseline;
    if (controlledVariables !== undefined) data.controlledVariables = controlledVariables;
    if (result !== undefined) data.result = result;
    if (nextStep !== undefined) data.nextStep = nextStep;
    if (analysis !== undefined) data.analysis = analysis;
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (closeDate !== undefined) data.closeDate = closeDate ? new Date(closeDate) : null;

    const test = await prisma.test.update({ where: { id }, data });

    return NextResponse.json(test);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update test" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.test.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete test" },
      { status: 500 }
    );
  }
}

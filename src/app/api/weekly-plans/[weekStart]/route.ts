import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ weekStart: string }> }
) {
  try {
    const { weekStart } = await params;
    const plan = await prisma.weeklyPlan.findUnique({ where: { weekStart } });

    if (!plan) {
      return NextResponse.json({ error: "Weekly plan not found" }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weekly plan" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ weekStart: string }> }
) {
  try {
    const { weekStart } = await params;
    const body = await request.json();
    const {
      weekFocus, profitFocus, strategicTest,
      operationalLines, dependencies, doNotTouch, tentativeSequence,
    } = body;

    const data: Record<string, any> = {};
    if (weekFocus !== undefined) data.weekFocus = weekFocus;
    if (profitFocus !== undefined) data.profitFocus = profitFocus;
    if (strategicTest !== undefined) data.strategicTest = strategicTest;
    if (operationalLines !== undefined) data.operationalLines = operationalLines;
    if (dependencies !== undefined) data.dependencies = dependencies;
    if (doNotTouch !== undefined) data.doNotTouch = doNotTouch;
    if (tentativeSequence !== undefined) data.tentativeSequence = tentativeSequence;

    const plan = await prisma.weeklyPlan.update({ where: { weekStart }, data });

    return NextResponse.json(plan);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update weekly plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ weekStart: string }> }
) {
  try {
    const { weekStart } = await params;
    await prisma.weeklyPlan.delete({ where: { weekStart } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete weekly plan" },
      { status: 500 }
    );
  }
}

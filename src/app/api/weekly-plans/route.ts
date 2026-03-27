import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const plans = await prisma.weeklyPlan.findMany({
      orderBy: { weekStart: "desc" },
    });

    return NextResponse.json(plans);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weekly plans" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      weekStart, weekFocus, profitFocus, strategicTest,
      operationalLines, dependencies, doNotTouch, tentativeSequence,
    } = body;

    if (!weekStart) {
      return NextResponse.json(
        { error: "weekStart is required" },
        { status: 400 }
      );
    }

    const plan = await prisma.weeklyPlan.upsert({
      where: { weekStart },
      create: {
        weekStart, weekFocus, profitFocus, strategicTest,
        operationalLines, dependencies, doNotTouch, tentativeSequence,
      },
      update: {
        ...(weekFocus !== undefined && { weekFocus }),
        ...(profitFocus !== undefined && { profitFocus }),
        ...(strategicTest !== undefined && { strategicTest }),
        ...(operationalLines !== undefined && { operationalLines }),
        ...(dependencies !== undefined && { dependencies }),
        ...(doNotTouch !== undefined && { doNotTouch }),
        ...(tentativeSequence !== undefined && { tentativeSequence }),
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create/upsert weekly plan" },
      { status: 500 }
    );
  }
}

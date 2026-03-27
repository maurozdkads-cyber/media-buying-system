import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const notes = await prisma.dailyNote.findMany({
      orderBy: { date: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch daily notes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      date, activeItems, decisions, learnings,
      staysEqual, stops, scales,
      tomorrowProfitFocus, tomorrowTestFocus,
      tomorrowDependency, tomorrowSuccessCriterion,
    } = body;

    if (!date) {
      return NextResponse.json(
        { error: "date is required" },
        { status: 400 }
      );
    }

    const note = await prisma.dailyNote.upsert({
      where: { date },
      create: {
        date, activeItems, decisions, learnings,
        staysEqual, stops, scales,
        tomorrowProfitFocus, tomorrowTestFocus,
        tomorrowDependency, tomorrowSuccessCriterion,
      },
      update: {
        ...(activeItems !== undefined && { activeItems }),
        ...(decisions !== undefined && { decisions }),
        ...(learnings !== undefined && { learnings }),
        ...(staysEqual !== undefined && { staysEqual }),
        ...(stops !== undefined && { stops }),
        ...(scales !== undefined && { scales }),
        ...(tomorrowProfitFocus !== undefined && { tomorrowProfitFocus }),
        ...(tomorrowTestFocus !== undefined && { tomorrowTestFocus }),
        ...(tomorrowDependency !== undefined && { tomorrowDependency }),
        ...(tomorrowSuccessCriterion !== undefined && { tomorrowSuccessCriterion }),
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create/upsert daily note" },
      { status: 500 }
    );
  }
}

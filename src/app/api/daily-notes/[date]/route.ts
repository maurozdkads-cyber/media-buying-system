import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    const note = await prisma.dailyNote.findUnique({ where: { date } });

    if (!note) {
      return NextResponse.json({ error: "Daily note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch daily note" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    const body = await request.json();
    const {
      activeItems, decisions, learnings,
      staysEqual, stops, scales,
      tomorrowProfitFocus, tomorrowTestFocus,
      tomorrowDependency, tomorrowSuccessCriterion,
    } = body;

    const data: Record<string, any> = {};
    if (activeItems !== undefined) data.activeItems = activeItems;
    if (decisions !== undefined) data.decisions = decisions;
    if (learnings !== undefined) data.learnings = learnings;
    if (staysEqual !== undefined) data.staysEqual = staysEqual;
    if (stops !== undefined) data.stops = stops;
    if (scales !== undefined) data.scales = scales;
    if (tomorrowProfitFocus !== undefined) data.tomorrowProfitFocus = tomorrowProfitFocus;
    if (tomorrowTestFocus !== undefined) data.tomorrowTestFocus = tomorrowTestFocus;
    if (tomorrowDependency !== undefined) data.tomorrowDependency = tomorrowDependency;
    if (tomorrowSuccessCriterion !== undefined) data.tomorrowSuccessCriterion = tomorrowSuccessCriterion;

    const note = await prisma.dailyNote.update({ where: { date }, data });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update daily note" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    const { date } = await params;
    await prisma.dailyNote.delete({ where: { date } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete daily note" },
      { status: 500 }
    );
  }
}

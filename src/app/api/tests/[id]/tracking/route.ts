import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entries = await prisma.trackingEntry.findMany({
      where: { testId: id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tracking entries" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { variant, date, spend, primaryMetric, secondaryMetric, notes } = body;

    if (!variant || !date) {
      return NextResponse.json(
        { error: "variant and date are required" },
        { status: 400 }
      );
    }

    const test = await prisma.test.findUnique({ where: { id } });
    if (!test) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const entry = await prisma.trackingEntry.create({
      data: {
        testId: id,
        variant,
        date,
        spend,
        primaryMetric,
        secondaryMetric,
        notes,
      },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create tracking entry" },
      { status: 500 }
    );
  }
}

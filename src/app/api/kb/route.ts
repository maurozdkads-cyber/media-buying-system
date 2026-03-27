import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const platform = searchParams.get("platform");
    const vertical = searchParams.get("vertical");
    const confidence = searchParams.get("confidence");

    const where: Record<string, any> = {};
    if (category) where.category = category;
    if (platform) where.platform = platform;
    if (vertical) where.vertical = vertical;
    if (confidence) where.confidence = confidence;

    const entries = await prisma.kBEntry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch KB entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, title, category, platform, vertical, confidence, learning, context } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "title and category are required" },
        { status: 400 }
      );
    }

    const entry = await prisma.kBEntry.create({
      data: { testId, title, category, platform, vertical, confidence, learning, context },
    });

    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create KB entry" },
      { status: 500 }
    );
  }
}

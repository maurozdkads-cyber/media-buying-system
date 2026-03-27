import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const entry = await prisma.kBEntry.findUnique({ where: { id } });

    if (!entry) {
      return NextResponse.json({ error: "KB entry not found" }, { status: 404 });
    }

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch KB entry" },
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
    const { testId, title, category, platform, vertical, confidence, learning, context } = body;

    const data: Record<string, any> = {};
    if (testId !== undefined) data.testId = testId;
    if (title !== undefined) data.title = title;
    if (category !== undefined) data.category = category;
    if (platform !== undefined) data.platform = platform;
    if (vertical !== undefined) data.vertical = vertical;
    if (confidence !== undefined) data.confidence = confidence;
    if (learning !== undefined) data.learning = learning;
    if (context !== undefined) data.context = context;

    const entry = await prisma.kBEntry.update({ where: { id }, data });

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update KB entry" },
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
    await prisma.kBEntry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete KB entry" },
      { status: 500 }
    );
  }
}

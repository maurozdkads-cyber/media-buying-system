import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const input = await prisma.input.findUnique({ where: { id } });

    if (!input) {
      return NextResponse.json({ error: "Input not found" }, { status: 404 });
    }

    return NextResponse.json(input);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch input" },
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
    const { type, bucket, priority, status, text, source, date, context, link } = body;

    const input = await prisma.input.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(bucket !== undefined && { bucket }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
        ...(text !== undefined && { text }),
        ...(source !== undefined && { source }),
        ...(date !== undefined && { date }),
        ...(context !== undefined && { context }),
        ...(link !== undefined && { link }),
      },
    });

    return NextResponse.json(input);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update input" },
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
    await prisma.input.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete input" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status ? { status: status as any } : {};
    const inputs = await prisma.input.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(inputs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inputs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, source, date, context, link, status, type, bucket, priority } = body;

    if (!text || !date) {
      return NextResponse.json(
        { error: "text and date are required" },
        { status: 400 }
      );
    }

    const input = await prisma.input.create({
      data: { text, source, date, context, link, status, type, bucket, priority },
    });

    return NextResponse.json(input, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create input" },
      { status: 500 }
    );
  }
}

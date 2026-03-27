import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const input = await prisma.input.findUnique({ where: { id } });
    if (!input) {
      return NextResponse.json({ error: "Input not found" }, { status: 404 });
    }

    if (input.status === "converted") {
      return NextResponse.json(
        { error: "Input already converted" },
        { status: 400 }
      );
    }

    const [test, updatedInput] = await prisma.$transaction([
      prisma.test.create({
        data: {
          title: input.text,
          hypothesis: input.context || "",
          category: input.type === "hipotesis" ? undefined : undefined,
          platform: undefined,
          vertical: undefined,
        },
      }),
      prisma.input.update({
        where: { id },
        data: { status: "converted" },
      }),
    ]);

    return NextResponse.json({ test, input: updatedInput }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to convert input" },
      { status: 500 }
    );
  }
}

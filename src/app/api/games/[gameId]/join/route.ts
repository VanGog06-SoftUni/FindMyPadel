import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ gameId: string }> },
) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { gameId } = await params;
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: true },
    });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const already = await prisma.gamePlayer.findFirst({
      where: { gameId, userId },
    });

    if (already) {
      return NextResponse.json({ error: "Already joined" }, { status: 409 });
    }

    if ((game.players?.length ?? 0) >= 4) {
      return NextResponse.json({ error: "Game is full" }, { status: 409 });
    }

    const created = await prisma.gamePlayer.create({
      data: { gameId, userId },
      include: { user: true },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Join fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ gameId: string }> },
) {
  try {
    const session = await auth();

    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { gameId } = await params;
    const game = await prisma.game.findUnique({ where: { id: gameId } });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const existing = await prisma.gamePlayer.findFirst({
      where: { gameId, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not joined" }, { status: 404 });
    }

    await prisma.gamePlayer.delete({ where: { id: existing.id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Leave fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

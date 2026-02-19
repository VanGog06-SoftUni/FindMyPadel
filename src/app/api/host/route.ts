import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const { date, startIndex, endIndex, payment } = body ?? {};

    if (
      !date ||
      typeof startIndex !== "number" ||
      typeof endIndex !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid request payload" },
        { status: 400 },
      );
    }

    if (startIndex < 0 || endIndex < startIndex) {
      return NextResponse.json(
        { error: "Invalid time range" },
        { status: 400 },
      );
    }

    // enforce max 4 slots
    if (endIndex - startIndex + 1 > 4) {
      return NextResponse.json(
        { error: "Maximum reservation is 4 slots (2 hours)" },
        { status: 400 },
      );
    }

    // normalize date to midnight UTC for storage
    const gameDate = new Date(date);
    gameDate.setUTCHours(0, 0, 0, 0);

    // overlap check on same date (single court)
    const overlapping = await prisma.game.findFirst({
      where: {
        date: gameDate,
        AND: [
          { startIndex: { lte: endIndex } },
          { endIndex: { gte: startIndex } },
        ],
      },
    });

    if (overlapping) {
      return NextResponse.json(
        { error: "Time slot overlaps existing game" },
        { status: 409 },
      );
    }

    const game = await prisma.game.create({
      data: {
        date: gameDate,
        startIndex,
        endIndex,
        hostId: session.user.id,
        players: { create: [{ userId: session.user.id }] },
      },
    });

    return NextResponse.json(
      {
        message: "Game created successfully",
        gameId: game.id,
        payment: payment ?? "On site",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Host create error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Missing date" }, { status: 400 });
    }

    const gameDate = new Date(dateParam);
    if (Number.isNaN(gameDate.getTime())) {
      return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    gameDate.setUTCHours(0, 0, 0, 0);

    const games = await prisma.game.findMany({
      where: { date: gameDate },
      select: { startIndex: true, endIndex: true },
    });

    return NextResponse.json({ games });
  } catch (error) {
    console.error("Host fetch error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

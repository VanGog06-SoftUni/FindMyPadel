"use client";

import { Calendar, Users } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildTimeSlots } from "@/lib/hostUtils";
import { addMinutes, getPlayerLabel } from "@/lib/utils";

import { JoinButton } from "./JoinButton";
import { LeaveButton } from "./LeaveButton";
import { StatusBadge } from "./StatusBadge";

import type { Game, Player } from "@/types/models";

export function GameCard({ game, index }: { game: Game; index: number }) {
  const { data: session } = useSession();

  const slots = buildTimeSlots();
  const start = slots[game.startIndex] ?? "--:--";

  // The stored endIndex represents the last slot index — display end time as end slot + 30 minutes
  const rawEndSlot = slots[game.endIndex] ?? slots[game.endIndex - 1];
  const end = rawEndSlot ? addMinutes(rawEndSlot, 30) : "--:--";

  const players = game.players ?? [];
  const playersCount = players.length;
  const isFull = playersCount >= 4;

  const date = typeof game.date === "string" ? new Date(game.date) : game.date;
  const dateLabel = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const userId = session?.user?.id;
  const isJoined = !!players.find((player: Player) => player.userId === userId);

  return (
    <Card className="p-4 border border-border">
      <CardHeader>
        <div>
          <CardTitle className="text-lg">Game #{index}</CardTitle>
          <CardDescription className="mt-1 text-sm">
            Padel court #1
          </CardDescription>
        </div>

        <CardAction>
          <StatusBadge isFull={isFull} />
        </CardAction>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{dateLabel}</span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="text-sm font-medium">
              {start} — {end}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              <span>{playersCount}/4</span>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-1">
          {Array.from({ length: 4 }).map((_, i) => {
            const player = players[i];
            const label = getPlayerLabel(player?.user);
            return (
              <div
                key={i}
                className="flex items-center gap-2 rounded-md px-2 py-1 border text-sm"
              >
                <div className="flex-1 text-xs text-muted-foreground">
                  {label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {label ? "Signed" : "Empty"}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      <CardFooter>
        {userId && (
          <div className="ml-auto">
            {isJoined ? (
              <LeaveButton gameId={game.id} />
            ) : (
              <JoinButton gameId={game.id} disabled={isFull} />
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default GameCard;

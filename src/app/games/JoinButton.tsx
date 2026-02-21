"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

import type { Player } from "@/types/models";

interface JoinButtonProps {
  gameId: string;
  players: Player[];
  disabled?: boolean;
}

export default function JoinButton({
  gameId,
  players,
  disabled = false,
}: JoinButtonProps) {
  const router = useRouter();
  const toast = useToast();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const userId = session?.user?.id;
  const isJoined = !!players.find((player: Player) => player.userId === userId);

  async function handleJoin() {
    if (!session) {
      toast("You must be signed in to join", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/games/${gameId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        toast("You joined the game", "success");
        router.refresh();
        return;
      }

      const body = await res.json();
      const message =
        (body && (body.error || body.message)) || (await res.text());
      toast(message || "Could not join game", "error");
    } catch (err) {
      console.error("Join error:", err);
      toast("Could not join game", "error");
    } finally {
      setLoading(false);
    }
  }

  if (isJoined) {
    return (
      <Button variant="destructive" className="px-3 py-1 text-sm">
        Leave
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      className="px-3 py-1 text-sm"
      onClick={handleJoin}
      disabled={loading || disabled}
    >
      {loading ? "Joining..." : "Join"}
    </Button>
  );
}

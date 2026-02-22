"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/shared";
import { Button } from "@/components/ui/button";

interface JoinButtonProps {
  gameId: string;
  disabled: boolean;
}

export function JoinButton({ gameId, disabled }: JoinButtonProps) {
  const router = useRouter();
  const toast = useToast();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

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

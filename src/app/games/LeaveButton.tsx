"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface LeaveButtonProps {
  gameId: string;
}

export function LeaveButton({ gameId }: LeaveButtonProps) {
  const router = useRouter();
  const toast = useToast();

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  async function handleLeave() {
    if (!session) {
      toast("You must be signed in to leave", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/games/${gameId}/join`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast("You left the game", "success");
        router.refresh();
        return;
      }

      const body = await res.json().catch(() => null);
      const message =
        (body && (body.error || body.message)) ||
        (await res.text().catch(() => ""));
      toast(message || "Could not leave game", "error");
    } catch (err) {
      console.error("Leave error:", err);
      toast("Could not leave game", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      className="px-3 py-1 text-sm"
      onClick={handleLeave}
      disabled={loading}
    >
      {loading ? "Leaving..." : "Leave"}
    </Button>
  );
}

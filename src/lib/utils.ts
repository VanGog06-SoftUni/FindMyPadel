import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { GamePlayer } from "@/types/game";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addMinutes(time: string, minsToAdd: number) {
  const [hh, mm] = time.split(":").map((v) => parseInt(v, 10));

  if (Number.isNaN(hh) || Number.isNaN(mm)) return time;

  let total = hh * 60 + mm + minsToAdd;
  total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);

  const h = Math.floor(total / 60);
  const m = total % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getPlayerLabel(p?: GamePlayer | null): string | null {
  if (!p || !p.user) return null;

  const nameParts: string[] = [];
  if (p.user.firstName) nameParts.push(p.user.firstName);
  if (p.user.lastName) nameParts.push(p.user.lastName ?? "");

  const fullName = nameParts.join(" ").trim();
  return fullName || p.user.email || null;
}

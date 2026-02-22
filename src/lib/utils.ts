import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { User } from "@/types/models";

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

export function getPlayerLabel(user: User | null): string {
  if (!user) return "";

  const nameParts: string[] = [];
  if (user.firstName) nameParts.push(user.firstName ?? "");
  if (user.lastName) nameParts.push(user.lastName ?? "");

  const fullName = nameParts.join(" ").trim();
  return fullName || user.email || "";
}

export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function buildTimeSlots(): string[] {
  const startMinutes = 7 * 60;
  const endMinutes = 23 * 60 + 30;
  const stepMinutes = 30;

  const slots: string[] = [];

  for (
    let totalMinutes = startMinutes;
    totalMinutes <= endMinutes;
    totalMinutes += stepMinutes
  ) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    slots.push(
      `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
    );
  }

  return slots;
}

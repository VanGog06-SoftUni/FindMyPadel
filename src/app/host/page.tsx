"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeSlots } from "@/components/ui/timeSlots";
import { formatDateForInput } from "@/lib/hostUtils";

export default function HostPage() {
  const [selectedDate, setSelectedDate] = useState(
    formatDateForInput(new Date()),
  );
  const [selectedSlotIndexes, setSelectedSlotIndexes] = useState<number[]>([]);

  return (
    <section className="relative overflow-hidden bg-secondary">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-secondary/35"
      />

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <Card className="w-full max-w-xl border-border">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-bold text-secondary">
              Host a Game
            </CardTitle>
            <CardDescription>
              Select a date and choose an available 30-minute slot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="host-date">Date</Label>
              <Input
                id="host-date"
                type="date"
                value={selectedDate}
                min={formatDateForInput(new Date())}
                max={formatDateForInput(
                  new Date(new Date().setMonth(new Date().getMonth() + 1)),
                )}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can select up to 2 hours (4 slots).
              </p>
            </div>

            <TimeSlots
              selectedSlotIndexes={selectedSlotIndexes}
              onSlotSelect={setSelectedSlotIndexes}
              selectedDate={selectedDate}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

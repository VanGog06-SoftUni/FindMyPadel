"use client";

import { useMemo } from "react";

import { useDragSlots } from "@/hooks/useDragSlots";
import { buildTimeSlots } from "@/lib/hostUtils";

interface TimeSlotsProps {
  selectedSlotIndexes: number[];
  onSlotSelect: (indexes: number[]) => void;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedSlotIndexes,
  onSlotSelect,
}) => {
  const timeSlots = useMemo(() => buildTimeSlots(), []);
  const {
    dragState,
    dragPreviewIndexes,
    handlePointerDown,
    handlePointerEnter,
  } = useDragSlots(selectedSlotIndexes, onSlotSelect);

  const isSlotSelected = (index: number) => {
    if (dragState.isDragging) {
      return dragPreviewIndexes.includes(index);
    }

    return selectedSlotIndexes.includes(index);
  };

  return (
    <div
      className="max-h-[60vh] space-y-1 overflow-y-auto pr-1"
      style={{ userSelect: dragState.isDragging ? "none" : "auto" }}
    >
      {timeSlots.map((slot, index) => (
        <button
          key={slot}
          type="button"
          className={`flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
            isSlotSelected(index)
              ? "border-primary/25 bg-primary text-primary-foreground brightness-90"
              : "border-primary/25 bg-primary text-primary-foreground hover:brightness-90"
          }`}
          onPointerDown={() => handlePointerDown(index)}
          onPointerEnter={() => handlePointerEnter(index)}
        >
          <span className="font-medium">{slot}</span>
          <span className="text-sm">Free</span>
        </button>
      ))}
    </div>
  );
};

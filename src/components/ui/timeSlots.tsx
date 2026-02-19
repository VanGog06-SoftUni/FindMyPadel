"use client";

import { useMemo, useState } from "react";

import { useDragSlots } from "@/hooks/useDragSlots";
import { buildTimeSlots } from "@/lib/hostUtils";

import { Button } from "./button";
import { Dialog } from "./dialog";
import { DialogBody } from "./dialogBody";

interface TimeSlotsProps {
  selectedSlotIndexes: number[];
  selectedDate: string;
  onSlotSelect: (indexes: number[]) => void;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedSlotIndexes,
  selectedDate,
  onSlotSelect,
}) => {
  const timeSlots = useMemo(() => buildTimeSlots(), []);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [reservation, setReservation] = useState<{
    date: string;
    startIndex: number;
    endIndex: number;
  } | null>(null);

  const handleSlotSelect = (indexes: number[]) => {
    onSlotSelect(indexes);
    setReservation({
      date: selectedDate,
      startIndex: Math.min(...indexes),
      endIndex: Math.max(...indexes),
    });
    setDialogOpen(true);
  };

  const {
    dragState,
    dragPreviewIndexes,
    handlePointerDown,
    handlePointerEnter,
  } = useDragSlots(selectedSlotIndexes, handleSlotSelect);

  const isSlotSelected = (index: number) => {
    if (dragState.isDragging) {
      return dragPreviewIndexes.includes(index);
    }
    return selectedSlotIndexes.includes(index);
  };

  const handleSlotClick = (index: number) => {
    setReservation({
      date: selectedDate,
      startIndex: index,
      endIndex: index,
    });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setReservation(null);
    onSlotSelect([]);
  };

  return (
    <>
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
            onClick={() => handleSlotClick(index)}
          >
            <span className="font-medium">{slot}</span>
            <span className="text-sm">Free</span>
          </button>
        ))}
      </div>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        title="Reservation"
        footer={
          <Button onClick={handleDialogClose} className="ml-auto">
            Reserve
          </Button>
        }
      >
        {reservation && (
          <DialogBody
            date={reservation.date}
            startIndex={reservation.startIndex}
            endIndex={reservation.endIndex}
            timeSlots={timeSlots}
          />
        )}
      </Dialog>
    </>
  );
};

import { ON_SITE_PAYMENT } from "@/lib/const";

interface DialogBodyProps {
  courtName?: string;
  date: string;
  startIndex: number;
  endIndex: number;
  timeSlots: string[];
}

export const DialogBody: React.FC<DialogBodyProps> = ({
  courtName = "Padel court #1",
  date,
  startIndex,
  endIndex,
  timeSlots,
}) => {
  const startTime = timeSlots[startIndex];
  const endTime = timeSlots[endIndex + 1] || timeSlots[endIndex];

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  let duration = endH * 60 + endM - (startH * 60 + startM);
  if (duration <= 0) duration = 30;

  const amount = Math.ceil(duration / 30) * 10;

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="font-medium">Name</span>
        <span>{courtName}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Date</span>
        <span>{date}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Start Time</span>
        <span>{startTime}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">End Time</span>
        <span>{endTime}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Duration</span>
        <span>{duration} min</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-medium">Payment</span>
        <select className="border rounded px-2 py-1 bg-white dark:bg-zinc-900">
          <option>{ON_SITE_PAYMENT}</option>
        </select>
      </div>
      <div className="flex justify-between">
        <span className="font-medium">Amount</span>
        <span>€{amount}</span>
      </div>
    </div>
  );
};

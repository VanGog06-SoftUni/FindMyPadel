// Utility functions for HostPage

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

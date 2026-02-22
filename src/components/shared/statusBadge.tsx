interface StatusBadgeProps {
  isFull: boolean;
}

export function StatusBadge({ isFull }: StatusBadgeProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${
        isFull
          ? "bg-red-600 text-white"
          : "bg-primary/20 text-primary-foreground"
      }`}
    >
      {isFull ? "Full" : "Open"}
    </span>
  );
}

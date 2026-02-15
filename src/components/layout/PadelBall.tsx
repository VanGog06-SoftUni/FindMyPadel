type PadelBallProps = {
  className?: string;
};

export function PadelBall({ className }: PadelBallProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flat ball */}
      <circle cx="16" cy="16" r="14" fill="currentColor" />

      {/* Clean seams (slight dark stroke under a light stroke) */}
      <path
        d="M10 5 C6.2 11.2, 6.2 20.8, 10 27"
        stroke="hsl(var(--foreground))"
        strokeOpacity="0.28"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 5 C25.8 11.2, 25.8 20.8, 22 27"
        stroke="hsl(var(--foreground))"
        strokeOpacity="0.28"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 5 C6.2 11.2, 6.2 20.8, 10 27"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="2.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 5 C25.8 11.2, 25.8 20.8, 22 27"
        stroke="#ffffff"
        strokeOpacity="0.95"
        strokeWidth="2.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

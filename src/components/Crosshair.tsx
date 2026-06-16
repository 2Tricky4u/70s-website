interface CrosshairProps {
  className?: string;
  color?: string;
  strokeWidth?: number;
}

/** technical target / crosshair marker */
export function Crosshair({
  className = "",
  color = "currentColor",
  strokeWidth = 1.4,
}: CrosshairProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.2" />
      <line x1="12" y1="0.5" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="23.5" />
      <line x1="0.5" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="23.5" y2="12" />
    </svg>
  );
}

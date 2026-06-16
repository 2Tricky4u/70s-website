/** wireframe globe — circle, curved meridians, latitude lines (worn) */
export function Globe({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <g filter="url(#roughen-2)">
        <circle cx="24" cy="24" r="17.5" strokeWidth={1.4} />
        {/* meridians (vertical) */}
        <ellipse cx="24" cy="24" rx="6.5" ry="17.5" strokeWidth={1.1} />
        <ellipse cx="24" cy="24" rx="13.5" ry="17.5" strokeWidth={1} opacity={0.7} />
        {/* latitude lines (horizontal) */}
        <line x1="6.5" y1="24" x2="41.5" y2="24" strokeWidth={1.2} />
        <line x1="11" y1="14" x2="37" y2="14" strokeWidth={1} opacity={0.75} />
        <line x1="11" y1="34" x2="37" y2="34" strokeWidth={1} opacity={0.75} />
      </g>
    </svg>
  );
}

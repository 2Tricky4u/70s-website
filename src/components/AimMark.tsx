/** target reticle (worn ink). small = single-ring "+" mark;
 *  large = double-ring crosshair. Shared by header + hero. */
export function AimMark({
  className = "",
  small = false,
}: {
  className?: string;
  small?: boolean;
}) {
  if (small) {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeLinecap="butt"
        aria-hidden="true"
      >
        <g filter="url(#roughen)">
          <circle cx="24" cy="24" r="13" strokeWidth={1.3} />
          {/* crosshair arms */}
          <line x1="1.5" y1="24" x2="15" y2="24" strokeWidth={1.3} />
          <line x1="33" y1="24" x2="46.5" y2="24" strokeWidth={1.3} />
          <line x1="24" y1="5" x2="24" y2="16" strokeWidth={1.3} />
          <line x1="24" y1="32" x2="24" y2="43" strokeWidth={1.3} />
          {/* bold centre plus */}
          <line x1="24" y1="20.5" x2="24" y2="27.5" strokeWidth={2.1} />
          <line x1="20.5" y1="24" x2="27.5" y2="24" strokeWidth={2.1} />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="butt"
      aria-hidden="true"
    >
      <g filter="url(#roughen)">
        {/* concentric rings */}
        <circle cx="24" cy="24" r="13.5" strokeWidth={1.3} />
        <circle cx="24" cy="24" r="7.5" strokeWidth={1.1} />
        {/* crosshair arms straight across */}
        <line x1="1.5" y1="24" x2="46.5" y2="24" strokeWidth={1.3} />
        <line x1="24" y1="4" x2="24" y2="44" strokeWidth={1.3} />
      </g>
    </svg>
  );
}

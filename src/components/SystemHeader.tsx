import { Barcode } from "./Barcode";

/** Thin black technical system header (top of page). */
export function SystemHeader() {
  return (
    <div className="ink-panel relative z-50 overflow-hidden text-paper">
      {/* worn light-leak / lighter wear patch across the band */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(232,223,207,0.16) 58%, rgba(232,223,207,0.05) 70%, transparent 82%)",
          mixBlendMode: "screen",
        }}
      />
      {/* heavy scratches / dust over the band */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.5]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='80'%3E%3Cfilter id='s'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.012 0.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23s)' opacity='0.4'/%3E%3C/svg%3E\")",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1600px] items-stretch justify-between gap-3 px-3 py-2.5 sm:py-3">
        {/* ---------------- left cluster ---------------- */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AimLogo className="h-9 w-9 shrink-0 text-paper/85 sm:h-11 sm:w-11" />
          {/* stacked coordinates */}
          <div className="flex flex-col justify-center font-mono text-[9px] leading-[1.35] tracking-[0.12em] text-paper/85 sm:text-[11px]">
            <span>40.7128° N</span>
            <span>74.0060° W</span>
          </div>
          <span className="text-paper/40">·</span>
          <span className="self-center font-mono text-[10px] tracking-[0.18em] text-orange sm:text-[12px]">
            EST.1990
          </span>
        </div>

        {/* ---------------- center brand ---------------- */}
        <div className="flex items-center gap-2.5 self-center">
          <span className="whitespace-nowrap font-display text-base uppercase leading-none tracking-[0.04em] sm:text-xl md:text-2xl">
            NINETEEN <span className="text-orange">NINETY</span>
          </span>
          <span className="hidden flex-col font-condensed text-[9px] font-medium uppercase leading-[1.25] tracking-[0.3em] text-paper/75 sm:flex sm:text-[10px]">
            <span>PHOTO</span>
            <span>ARCHIVE</span>
          </span>
        </div>

        {/* ---------------- right cluster ---------------- */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Barcode
            seed="header-bar"
            color="#e8dfcf"
            bars={42}
            label="KSDT.CIRIS.0018"
            className="hidden h-9 w-28 opacity-85 sm:flex lg:w-36"
          />
          <span className="hidden self-center font-mono text-[10px] tracking-[0.14em] text-paper/70 md:inline">
            ARCV.1990.0018
          </span>
          <span className="hidden text-paper/40 md:inline">·</span>
          <div className="flex items-center gap-2.5">
            <AimLogo className="hidden h-7 w-7 text-paper/75 sm:block" small />
            <Globe className="hidden h-7 w-7 text-paper/75 sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** target reticle. small = simple single-ring "+" mark (aim.png);
 *  large = double-ring, centre dot, four end-bracket ticks (aim2.png) */
function AimLogo({
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

/** wireframe globe — circle, curved meridians, latitude lines */
function Globe({ className = "" }: { className?: string }) {
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

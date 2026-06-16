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
            className="hidden h-7 w-20 opacity-85 sm:block lg:w-28"
          />
          <span className="hidden self-center font-mono text-[10px] tracking-[0.14em] text-paper/70 md:inline">
            ARCHIVE.ID 1990-0001
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

/** worn concentric target with crosshair — distressed, no box brackets */
function AimLogo({
  className = "",
  small = false,
}: {
  className?: string;
  small?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* roughened ink group: uneven weights + slightly off-centre rings */}
      <g filter="url(#roughen)">
        {!small && (
          <circle cx="23.4" cy="24.3" r="15" strokeWidth={1.1} opacity={0.7} />
        )}
        <circle cx="24.2" cy="23.7" r="10.4" strokeWidth={1.8} />
        <circle cx="23.8" cy="24.1" r="5.2" strokeWidth={1.3} opacity={0.85} />
        <circle cx="24" cy="24" r="1.9" fill="currentColor" stroke="none" />
        {/* crosshair lines — varied length / weight, not touching the rings */}
        <line x1="24" y1="3.5" x2="24" y2="12" strokeWidth={1.6} />
        <line x1="24" y1="36" x2="24" y2="45" strokeWidth={1.1} opacity={0.8} />
        <line x1="3.5" y1="24" x2="12.5" y2="24" strokeWidth={1.2} opacity={0.85} />
        <line x1="36" y1="24" x2="44.5" y2="24" strokeWidth={1.6} />
      </g>
    </svg>
  );
}

/** worn latitude/longitude globe glyph — distressed, broken meridians */
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
        <circle cx="24.2" cy="23.8" r="18" strokeWidth={1.7} />
        <ellipse cx="23.7" cy="24.2" rx="8.4" ry="18" strokeWidth={1.1} opacity={0.8} />
        <line x1="6.5" y1="24" x2="41" y2="24" strokeWidth={1.5} />
        <line x1="10" y1="14.2" x2="38" y2="13.6" strokeWidth={1} opacity={0.75} />
        <line x1="9.5" y1="34" x2="38.5" y2="34.4" strokeWidth={1} opacity={0.75} />
      </g>
    </svg>
  );
}

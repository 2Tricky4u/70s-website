import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";

/** Thin black technical system header (top of page). */
export function SystemHeader() {
  return (
    <div className="ink-panel relative z-50 overflow-hidden text-paper">
      {/* same subtle scanlines as the footer so the band blends into the stage */}
      <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-[1600px] items-stretch justify-between gap-3 px-3 py-2.5 sm:py-3">
        {/* ---------------- left cluster ---------------- */}
        <div className="flex items-center gap-3 sm:gap-4">
          <AimMark className="h-9 w-9 shrink-0 text-paper/85 sm:h-11 sm:w-11" />
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
            <AimMark className="hidden h-7 w-7 text-paper/75 sm:block" small />
            <Globe className="hidden h-7 w-7 text-paper/75 sm:block" />
          </div>
        </div>
      </div>
    </div>
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

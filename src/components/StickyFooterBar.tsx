import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AimMark } from "./AimMark";
import { Globe } from "./Globe";
import { NowPlaying } from "./NowPlaying";

/** short, centered vertical separator (not full-height) */
function Sep({ className = "" }: { className?: string }) {
  return (
    <span
      className={`h-8 w-px shrink-0 self-center bg-paper/30 ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Persistent footer bar pinned to the bottom of the viewport (a 1:1 of the
 * reference footer). Stays visible while scrolling and slides away once the
 * real footer (#contact) scrolls into view, so it never overlaps it.
 */
export function StickyFooterBar() {
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setAtFooter(e.isIntersecting), {
      threshold: 0,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <motion.aside
      aria-hidden={atFooter}
      initial={false}
      animate={{ y: atFooter ? "110%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      className="ink-panel fixed inset-x-0 bottom-0 z-[94] border-t-2 border-ink text-paper shadow-[0_-14px_36px_rgba(0,0,0,0.55)]"
    >
      <div
        className="scanlines pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      {/* three groups spread evenly (justify-between) so the sections feel airy.
          The song player is the priority — © + join text collapse first. */}
      <div className="relative mx-auto flex max-w-[1600px] items-center justify-between gap-5 px-4 py-2.5 sm:px-6 lg:gap-6 lg:px-10">
        {/* © / archive — lowest priority, large screens only */}
        <div className="hidden items-center gap-5 lg:flex">
          <AimMark small className="h-6 w-6 shrink-0 text-paper/70" />
          <div className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-paper/75">
            <span className="block">ALL PHOTOS © NINETEEN NINETY ARCHIVE</span>
            <span className="block text-paper/55">
              BUILT IN THE 90S. RUNNING TODAY.
            </span>
          </div>
        </div>

        {/* now playing — always visible (priority); aim + sep lead it on lg+ */}
        <div className="flex min-w-0 items-center gap-4 lg:gap-5">
          <AimMark small className="hidden h-6 w-6 shrink-0 text-paper/70 lg:block" />
          <Sep className="hidden lg:block" />
          <NowPlaying
            bars={40}
            waveClass="h-7 w-24 sm:w-32 md:w-40 lg:w-44 xl:w-56"
            titleClass="hidden sm:block"
            controlsClass="hidden md:flex"
          />
        </div>

        {/* join / submit — SUBMIT always; text/marks fold away first */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Sep className="hidden lg:block" />
          <div className="hidden text-right font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] lg:block">
            <span className="block text-orange">JOIN THE ARCHIVE</span>
            <span className="block text-paper/55">SUBMIT YOUR MEMORY</span>
          </div>
          <AimMark
            small
            className="hidden h-6 w-6 shrink-0 text-paper/70 xl:block"
          />
          <a
            href="#contact"
            className="flex items-center gap-3 border border-orange px-3 py-1.5 font-condensed text-xs font-semibold uppercase tracking-[0.25em] text-orange transition hover:bg-orange hover:text-ink sm:px-4"
          >
            Submit <span>›</span>
          </a>
          <Globe className="hidden h-6 w-6 shrink-0 text-paper/70 xl:block" />
        </div>
      </div>
    </motion.aside>
  );
}

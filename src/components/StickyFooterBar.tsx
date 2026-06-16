import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AimMark } from "./AimMark";
import { Globe } from "./Globe";
import { Waveform } from "./Waveform";

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
      <div className="relative mx-auto flex max-w-[1600px] items-stretch">
        {/* © / archive */}
        <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
          <AimMark small className="hidden h-6 w-6 shrink-0 text-paper/70 sm:block" />
          <div className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] text-paper/75">
            <span className="block">ALL PHOTOS © NINETEEN NINETY ARCHIVE</span>
            <span className="block text-paper/55">
              BUILT IN THE 90S. RUNNING TODAY.
            </span>
          </div>
        </div>

        {/* now playing + waveform */}
        <div className="hidden items-center gap-3 border-l border-paper/20 px-4 lg:flex">
          <AimMark small className="h-6 w-6 shrink-0 text-paper/70" />
          <div className="whitespace-nowrap font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em]">
            <span className="block text-paper/55">NOW PLAYING</span>
            <span className="block text-paper">808 STATE — PACIFIC 202</span>
          </div>
          <Waveform bars={24} className="h-7 w-24" />
        </div>

        <div className="flex-1" />

        {/* join / submit */}
        <div className="flex items-center gap-3 border-l border-paper/20 px-3 sm:px-4">
          <div className="hidden text-right font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] sm:block">
            <span className="block text-orange">JOIN THE ARCHIVE</span>
            <span className="block text-paper/55">SUBMIT YOUR MEMORY</span>
          </div>
          <AimMark
            small
            className="hidden h-6 w-6 shrink-0 text-paper/70 md:block"
          />
          <a
            href="#contact"
            className="flex items-center gap-3 border border-orange px-3 py-1.5 font-condensed text-xs font-semibold uppercase tracking-[0.25em] text-orange transition hover:bg-orange hover:text-ink sm:px-4"
          >
            Submit <span>›</span>
          </a>
          <Globe className="hidden h-6 w-6 shrink-0 text-paper/70 md:block" />
        </div>
      </div>
    </motion.aside>
  );
}

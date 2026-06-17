import { motion } from "framer-motion";
import type { Poster } from "../types";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { seeded } from "../lib/grit";

interface PosterRowProps {
  poster: Poster;
  onOpen: (poster: Poster) => void;
}

/**
 * List-view row for the archive. Shares `layoutId={poster-<id>}` with PosterCard
 * so the shared-layout modal expand works from either view (only one view is
 * mounted at a time, so the layoutId is never duplicated).
 */
export function PosterRow({ poster, onOpen }: PosterRowProps) {
  const r = seeded(poster.id);
  const bgPos = `${Math.round(r() * 100)}% ${Math.round(r() * 100)}%`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      <motion.button
        layoutId={`poster-${poster.id}`}
        onClick={() => onOpen(poster)}
        style={{ "--paper-pos": bgPos } as React.CSSProperties}
        whileHover={{ x: 4 }}
        className="ink-border paper-panel relative flex w-full items-stretch gap-3 overflow-hidden text-left sm:gap-4"
      >
        {/* thumbnail */}
        <div className="relative w-20 shrink-0 overflow-hidden border-r border-ink/80 sm:w-28">
          <ArchiveImage
            src={poster.image}
            alt={poster.title.replace("\n", " ")}
            className="aspect-[4/5] h-full w-full"
          />
          {poster.accent && (
            <span className="absolute left-1 top-1 bg-orange px-1 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-ink">
              {poster.accent}
            </span>
          )}
        </div>

        {/* body */}
        <div className="relative z-[2] flex min-w-0 flex-1 flex-col justify-center gap-1 py-2 pr-2 sm:py-3">
          <div className="flex items-start justify-between gap-2">
            <DistressedTitle
              as="h3"
              seed={poster.id}
              amount={0.4}
              className="font-display text-xl uppercase leading-[0.85] tracking-tightest text-ink transition-colors group-hover:text-orange sm:text-2xl"
            >
              {poster.title.replace("\n", " ")}
            </DistressedTitle>
            <span className="shrink-0 -rotate-2 bg-ink px-1.5 py-0.5 font-display text-sm leading-none text-paper">
              '{String(poster.year).slice(2)}
            </span>
          </div>

          {poster.subtitle && (
            <span className="font-condensed text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
              {poster.subtitle}
            </span>
          )}

          <span className="hidden truncate font-mono text-[9px] uppercase tracking-[0.12em] text-ink/55 sm:block">
            {poster.location} · {poster.coords}
          </span>

          <div className="mt-0.5 flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              <Barcode
                seed={poster.id}
                className="h-3.5 w-16 transition-opacity duration-100 group-hover:animate-flicker"
              />
              <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/55">
                {poster.archiveId}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-ink/55">
              <span className="border border-ink/30 px-1.5 py-0.5">
                {poster.category}
              </span>
              <span className="text-orange">OPEN ↗</span>
            </div>
          </div>
        </div>

        <WornLayer seed={`row-${poster.id}`} amount={0.22} />
      </motion.button>
    </motion.div>
  );
}

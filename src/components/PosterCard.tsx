import { motion, useMotionTemplate, type MotionStyle } from "framer-motion";
import type { Poster } from "../types";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { useTilt } from "../hooks/useTilt";
import { seeded } from "../lib/grit";

interface PosterCardProps {
  poster: Poster;
  index: number;
  onOpen: (poster: Poster) => void;
}

/** small per-card rotation for imperfect print alignment */
const ROT = [-1.1, 0.7, -0.5, 1.2, -0.8, 0.4];

export function PosterCard({ poster, index, onOpen }: PosterCardProps) {
  const { rotateX, rotateY, glareX, glareY, shiftX, shiftY, onMove, onLeave } =
    useTilt(8);
  const baseRot = ROT[index % ROT.length];
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 45%)`;
  // per-card paper crop so no two cards show the same stain
  const r = seeded(poster.id);
  const bgPos = `${Math.round(r() * 100)}% ${Math.round(r() * 100)}%`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, rotate: baseRot * 2 }}
      animate={{ opacity: 1, y: 0, rotate: baseRot }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ perspective: 900 }}
      className="group"
    >
      <motion.button
        layoutId={`poster-${poster.id}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onClick={() => onOpen(poster)}
        style={
          {
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            "--paper-pos": bgPos,
          } as MotionStyle
        }
        whileHover={{ scale: 1.03, zIndex: 5 }}
        className="ink-border crop-marks paper-panel relative block w-full cursor-pointer text-left"
      >
        {/* ---- header strip ---- */}
        <div className="relative z-[2] flex items-start justify-between gap-2 px-2.5 pb-1.5 pt-2">
          <DistressedTitle
            as="h3"
            seed={poster.id}
            amount={0.4}
            className="font-display text-2xl uppercase leading-[0.82] tracking-tightest text-ink sm:text-[26px]"
          >
            {poster.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </DistressedTitle>
          <span className="shrink-0 -rotate-3 bg-ink px-1.5 py-0.5 font-display text-base leading-none text-paper">
            '{String(poster.year).slice(2)}
          </span>
        </div>

        {/* ---- subtitle accent ---- */}
        {poster.subtitle && (
          <div className="px-2.5 pb-1.5">
            <span className="font-condensed text-[11px] font-semibold uppercase tracking-[0.18em] text-orange">
              {poster.subtitle}
            </span>
          </div>
        )}

        {/* ---- photo ---- */}
        <div className="relative mx-2.5 overflow-hidden border border-ink/80">
          <ArchiveImage
            src={poster.image}
            alt={poster.title.replace("\n", " ")}
            className="aspect-[4/5] w-full"
          />

          {/* light-leak sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-orange/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden="true"
          />

          {/* cursor glare following tilt */}
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: glare,
              mixBlendMode: "screen",
            }}
            aria-hidden="true"
          />

          {/* accent label */}
          {poster.accent && (
            <span className="absolute left-1.5 top-1.5 bg-orange px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-ink">
              {poster.accent}
            </span>
          )}

          {/* category tag */}
          <span className="absolute bottom-1.5 right-1.5 border border-paper/50 bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-paper/90">
            {poster.category}
          </span>

          {/* microtext reveal on hover */}
          <motion.div
            style={{ x: shiftX, y: shiftY }}
            className="absolute bottom-1.5 left-1.5 max-w-[60%] translate-y-1 font-mono text-[7px] uppercase leading-tight tracking-[0.1em] text-paper/0 transition-colors duration-300 group-hover:text-paper/85"
          >
            {poster.coords}
          </motion.div>
        </div>

        {/* ---- footer: barcode + ids ---- */}
        <div className="flex items-end justify-between gap-2 px-2.5 pb-2.5 pt-2">
          <div className="flex flex-col gap-0.5">
            <Barcode
              seed={poster.id}
              className="h-4 w-20 transition-opacity duration-100 group-hover:animate-flicker"
            />
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink/55">
              {poster.archiveId}
            </span>
          </div>
          <div className="text-right font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-ink/55">
            <span className="block">No. {String(index + 1).padStart(3, "0")}</span>
            <span className="block text-orange">OPEN ↗</span>
          </div>
        </div>

        {/* per-card scratches/dust — each card "scanned" differently */}
        <WornLayer seed={`card-${poster.id}`} amount={0.3} />
      </motion.button>
    </motion.div>
  );
}

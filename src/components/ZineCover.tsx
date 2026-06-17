import { motion, useMotionTemplate, type MotionStyle } from "framer-motion";
import type { CSSProperties } from "react";
import type { Zine } from "../types";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { useTilt } from "../hooks/useTilt";
import { seeded } from "../lib/grit";

interface ZineCoverProps {
  zine: Zine;
  index: number;
  onOpen: (zine: Zine) => void;
}

const ROT = [-0.6, 0.5, -0.4, 0.6, -0.5, 0.4];

/** A full zine cover that sits in the rack. Carries its own mood accent. */
export function ZineCover({ zine, index, onOpen }: ZineCoverProps) {
  const { rotateX, rotateY, glareX, glareY, onMove, onLeave } = useTilt(6);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.32), transparent 45%)`;
  const baseRot = ROT[index % ROT.length];
  const r = seeded(zine.id);
  const bgPos = `${Math.round(r() * 100)}% ${Math.round(r() * 100)}%`;
  const comingSoon = zine.status === "coming-soon";

  const themeStyle = {
    "--accent-rgb": zine.theme.accentRgb,
    "--duo-hue": zine.theme.hue,
  } as CSSProperties;

  return (
    <motion.div
      style={{ perspective: 1100, ...themeStyle }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
      className="group"
    >
      <motion.button
        type="button"
        onPointerMove={comingSoon ? undefined : onMove}
        onPointerLeave={comingSoon ? undefined : onLeave}
        onClick={comingSoon ? undefined : () => onOpen(zine)}
        disabled={comingSoon}
        animate={{ rotate: baseRot }}
        whileHover={comingSoon ? undefined : { rotate: baseRot + 0.5, y: -10 }}
        style={
          {
            rotateX: comingSoon ? 0 : rotateX,
            rotateY: comingSoon ? 0 : rotateY,
            transformStyle: "preserve-3d",
            "--paper-pos": bgPos,
          } as MotionStyle
        }
        className={`zine-cover crop-marks paper-panel relative block w-full text-left shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-shadow duration-300 ${
          comingSoon
            ? "cursor-default opacity-55 saturate-0"
            : "cursor-pointer group-hover:shadow-[0_22px_60px_rgba(0,0,0,0.7)]"
        }`}
      >
        {/* center fold / binding crease */}
        <span className="zine-fold pointer-events-none absolute inset-y-0 left-1/2 z-[3] w-px -translate-x-1/2" aria-hidden="true" />

        {/* ---- header ---- */}
        <div className="relative z-[2] flex items-start justify-between gap-2 px-3 pt-3">
          <span className="bg-orange px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
            ISSUE {zine.issueNo}
          </span>
          <AimMark small className="h-5 w-5 text-orange" />
        </div>

        {/* ---- title ---- */}
        <div className="relative z-[2] px-3 pt-2">
          <DistressedTitle
            as="h3"
            seed={zine.id}
            amount={0.45}
            className="font-display text-3xl uppercase leading-[0.8] tracking-tightest text-ink transition-colors group-hover:text-orange sm:text-4xl"
          >
            {zine.title.split("\n").map((line, i) => (
              <span key={i} className="block group-hover:[text-shadow:1.5px_0_0_rgb(var(--accent-rgb)/0.7),-1.5px_0_0_rgba(59,110,165,0.5)]">
                {line}
              </span>
            ))}
          </DistressedTitle>
        </div>

        {/* ---- central photo ---- */}
        <div className="relative z-[2] mx-3 mt-3 overflow-hidden border border-ink/80">
          <ArchiveImage
            src={zine.cover}
            alt={zine.title.replace("\n", " ")}
            className="aspect-[4/5] w-full"
          />
          {/* light-leak sweep on hover */}
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgb(var(--accent-rgb)/0.5)] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden="true"
          />
          {/* tilt glare */}
          {!comingSoon && (
            <motion.div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: glare, mixBlendMode: "screen" }}
              aria-hidden="true"
            />
          )}
          {comingSoon ? (
            <span className="absolute inset-x-2 top-2 -rotate-3 border border-ink bg-ink/80 py-1 text-center font-display text-lg uppercase tracking-[0.1em] text-paper">
              Coming Soon
            </span>
          ) : (
            <span className="absolute bottom-1.5 left-1.5 max-w-[70%] font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-paper/0 transition-colors duration-300 group-hover:text-paper/90">
              {zine.theme.mood}
            </span>
          )}
          {/* tiny LOADED/READY tag */}
          {!comingSoon && (
            <span className="absolute right-1.5 top-1.5 border border-orange bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              LOADED / READY
            </span>
          )}
        </div>

        {/* ---- meta line ---- */}
        <div className="relative z-[2] flex items-center justify-between gap-2 px-3 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/55">
          <span>{zine.years}</span>
          <span>{comingSoon ? "— PHOTOS" : `${zine.photoCount} PHOTOS`}</span>
          <span>{comingSoon ? "— NOTES" : `${zine.noteCount} NOTES`}</span>
        </div>

        {/* ---- footer: barcode + open ---- */}
        <div className="relative z-[2] flex items-end justify-between gap-2 px-3 pb-3 pt-1.5">
          <div className="flex flex-col gap-0.5">
            <Barcode
              seed={zine.id}
              className="h-4 w-24 transition-opacity duration-100 group-hover:animate-flicker"
            />
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-ink/55">
              {zine.archiveId}
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-orange">
            {comingSoon ? "UNDEVELOPED" : "OPEN ISSUE ↗"}
          </span>
        </div>

        {/* per-cover scan grit + damaged corners */}
        <WornLayer seed={`zine-${zine.id}`} amount={0.32} />
        <span className="zine-corner zine-corner-tl" aria-hidden="true" />
        <span className="zine-corner zine-corner-br" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}

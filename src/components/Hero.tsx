import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { Crosshair } from "./Crosshair";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // parallax layers move at different speeds
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const yTexture = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden border-b-2 border-ink"
    >
      {/* drifting smoke / noise texture layer */}
      <motion.div
        style={{ y: yTexture }}
        className="pointer-events-none absolute inset-0 z-0 animate-drift opacity-40"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 65% 40%, rgba(255,75,11,0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(124,111,90,0.25), transparent 60%)",
          }}
        />
      </motion.div>

      {/* flickering orange light leak */}
      <div
        className="light-leak animate-lightleak z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pb-10 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-4 lg:pb-16 lg:pt-14">
        {/* ---------- left: type ---------- */}
        <motion.div style={{ y: yText, opacity: fade }} className="flex flex-col">
          <div className="mb-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/70">
            <span className="text-orange">1990</span>
            <span className="h-px w-10 bg-ink/40" />
            <span>1999</span>
            <Crosshair className="h-3.5 w-3.5 text-ink/60" />
          </div>

          <h1 className="font-display leading-[0.82] tracking-tightest">
            <span className="block text-[18vw] sm:text-[15vw] lg:text-[10.5vw]">
              NINETEEN
            </span>
            <span className="chroma block text-[18vw] text-ink sm:text-[15vw] lg:text-[10.5vw]">
              NINETY
            </span>
          </h1>

          <p className="mt-5 max-w-xl font-condensed text-lg uppercase leading-tight tracking-[0.04em] text-ink/85 sm:text-xl lg:text-2xl">
            A personal photo archive of a decade that built us.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/70">
            <span>
              MEMORIES. <span className="text-orange">MOMENTS.</span> MAYHEM.
            </span>
          </div>

          <div className="mt-auto flex flex-wrap items-end gap-5 pt-8">
            <div className="flex flex-col gap-1">
              <Barcode seed="hero-found" className="h-7 w-40" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
                FOUND MEMORIES
              </span>
            </div>
            <a
              href="#archive"
              className="group flex items-center gap-2 border border-ink bg-ink px-4 py-2 font-condensed text-xs uppercase tracking-[0.25em] text-paper transition hover:bg-orange hover:text-ink"
            >
              <span className="animate-bounce">↓</span>
              <span>Scroll to explore</span>
            </a>
          </div>
        </motion.div>

        {/* ---------- right: cinematic collage ---------- */}
        <motion.div
          style={{ y: yImage }}
          className="relative min-h-[320px] lg:min-h-[480px]"
        >
          <div className="ink-border crop-marks absolute inset-0 overflow-hidden">
            <ArchiveImage
              src="https://picsum.photos/seed/nn-hero-stage/1200/1400"
              alt="Crowd and stage smoke, 1990s"
              deep
              className="absolute inset-0 h-full w-full"
            />
            {/* scanlines on the collage */}
            <div className="scanlines absolute inset-0" aria-hidden="true" />

            {/* smoke bloom over the photo */}
            <div
              className="pointer-events-none absolute inset-0 animate-flicker"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at 60% 35%, rgba(255,75,11,0.45), transparent 45%)",
                mixBlendMode: "screen",
              }}
            />

            <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/80">
              REEL 01 / FRAME 1990
            </div>
            <button className="absolute bottom-3 right-3 flex items-center gap-2 border border-paper/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/90 transition hover:border-orange hover:text-orange">
              PLAY ▸
            </button>
          </div>

          {/* circular "90" archive stamp */}
          <div className="absolute -left-4 -top-6 z-20 lg:-left-8">
            <NinetyStamp />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NinetyStamp() {
  return (
    <div className="relative grid h-24 w-24 place-items-center rounded-full border-2 border-orange text-orange animate-wobble sm:h-28 sm:w-28">
      <span className="font-display text-5xl leading-none sm:text-6xl">90</span>
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="stamp-arc"
            d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
            fill="none"
          />
        </defs>
        <text className="fill-orange font-mono text-[10px] uppercase tracking-[0.3em]">
          <textPath href="#stamp-arc" startOffset="0">
            · CERTIFIED ARCHIVE · NINETEEN NINETY · FOUND FOOTAGE ·
          </textPath>
        </text>
      </svg>
    </div>
  );
}

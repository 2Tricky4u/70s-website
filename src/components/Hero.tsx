import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";

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
          <div className="mb-3 flex items-center gap-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.3em] text-orange">
            <AimMark className="h-4 w-4 text-ink/55" small />
            <span>1990</span>
            <span className="h-[2px] w-2.5 bg-orange" />
            <span>1999</span>
            <AimMark className="h-4 w-4 text-ink/55" small />
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

          <div className="mt-5 flex flex-col gap-1 font-mono text-[11px] font-semibold uppercase tracking-[0.25em]">
            <span className="text-ink/75">MEMORIES. MOMENTS. MAYHEM.</span>
            <span className="text-orange">THIS IS THE 90S.</span>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-8 gap-y-5 pt-8">
            {/* dense, fine barcode with FOUND MEMORIES to its right */}
            <div className="flex items-center gap-3">
              <Barcode seed="hero-found" bars={82} className="h-8 w-32" />
              <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/65">
                Found Memories
              </span>
            </div>

            {/* understated, integrated scroll cue */}
            <a
              href="#archive"
              className="group flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/70 transition-colors hover:text-orange"
            >
              <span className="animate-bounce text-orange">↓</span>
              <span className="nav-scan">Scroll to explore</span>
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

            <div className="absolute left-3 top-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/80">
              REEL 01 / FRAME 1990
            </div>

            {/* PLAY — text + solid triangle, no box (like the reference) */}
            <button className="group absolute right-3 top-2.5 flex items-center gap-2 font-condensed text-base font-semibold uppercase tracking-[0.35em] text-paper/90 transition-colors hover:text-orange">
              Play
              <span className="text-[11px] tracking-normal transition-transform group-hover:translate-x-0.5">
                ▶
              </span>
            </button>

            {/* vertical archival microtype along the right edge */}
            <div className="writing-vertical absolute right-1 top-1/2 -translate-y-1/2 select-none font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-paper/55">
              TC 00:19:90:00 · REEL 01 ·{" "}
              <span className="text-orange">FOUND FOOTAGE</span> · STOCK 35MM
            </div>

            <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-paper/55">
              FIG. 01 — NINETEEN NINETY
            </div>
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
    <div className="relative grid h-28 w-28 place-items-center sm:h-36 sm:w-36">
      {/* grunge globe "'90" emblem */}
      <img
        src="/logo.png"
        alt="Nineteen Ninety archive stamp"
        className="absolute inset-[16%] h-[68%] w-[68%] animate-wobble object-contain"
      />
      {/* curved archive text turning all the way around the emblem */}
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="stamp-arc"
            d="M60,60 m-53,0 a53,53 0 1,1 106,0 a53,53 0 1,1 -106,0"
            fill="none"
          />
        </defs>
        <text
          className="fill-orange font-mono text-[8.5px] font-bold uppercase"
          textLength="333"
          lengthAdjust="spacing"
        >
          <textPath href="#stamp-arc" startOffset="0">
            NINETEEN NINETY · PHOTO ARCHIVE ·
          </textPath>
        </text>
      </svg>
    </div>
  );
}

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import type { Category, Poster, Zine } from "../types";
import { ZinePageView } from "./ZinePageView";
import { ExpandedPosterModal } from "./ExpandedPosterModal";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";
import { Crosshair } from "./Crosshair";

interface ZineReaderProps {
  zine: Zine;
  onClose: () => void;
}

const pageVariants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -60 : 60, opacity: 0 }),
};

export function ZineReader({ zine, onClose }: ZineReaderProps) {
  const total = zine.pages.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [zoom, setZoom] = useState<{ images: string[]; index: number } | null>(null);

  const goTo = useCallback(
    (next: number, d: number) => {
      const n = ((next % total) + total) % total;
      setDir(d);
      setIndex(n);
    },
    [total]
  );
  const step = useCallback((d: number) => goTo(index + d, d), [goTo, index]);
  const random = useCallback(() => {
    if (total < 2) return;
    let n = index;
    while (n === index) n = Math.floor(Math.random() * total);
    goTo(n, n > index ? 1 : -1);
  }, [goTo, index, total]);

  // keyboard: arrows turn pages, Esc closes (zoom first, then reader)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(null);
        else onClose();
        return;
      }
      if (zoom) return;
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, step, zoom]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -90) step(1);
      else if (info.offset.x > 90) step(-1);
    },
    [step]
  );

  const themeStyle = {
    "--accent-rgb": zine.theme.accentRgb,
    "--duo-hue": zine.theme.hue,
  } as CSSProperties;

  // synthesize a Poster so we can reuse ExpandedPosterModal for photo zoom
  const zoomPoster: Poster | null = useMemo(() => {
    if (!zoom) return null;
    return {
      id: `zine-zoom-${zine.id}-${zoom.index}`,
      title: zine.title,
      year: parseInt(zine.years, 10) || 1990,
      category: "Culture" as Category,
      image: zoom.images[zoom.index],
      location: zine.location,
      coords: zine.coords,
      description: zine.blurb,
      archiveId: zine.archiveId,
      tags: [zine.id, "zine", `issue-${zine.issueNo}`],
    };
  }, [zoom, zine]);

  const stepZoom = useCallback(
    (d: number) =>
      setZoom((z) =>
        z ? { ...z, index: ((z.index + d) % z.images.length + z.images.length) % z.images.length } : z
      ),
    []
  );

  return (
    <motion.aside
      key={zine.id}
      style={themeStyle}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-0 z-[96] flex flex-col text-paper"
    >
      {/* dark archive backdrop */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(26,22,16,0.97), rgba(6,6,5,0.99))",
        }}
      />
      <div className="scanlines pointer-events-none absolute inset-0 -z-10 opacity-40" />
      <div className="grain-layer animate-grain pointer-events-none absolute inset-0 -z-10 opacity-20" />

      {/* open print-scan flash */}
      <ZineScanBurst flashKey="open" />

      {/* ---- header ---- */}
      <header className="relative z-[2] border-b border-paper/15 bg-ink/40 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
            ISSUE {zine.issueNo}
          </span>
          <span className="font-display text-lg uppercase leading-none tracking-tightest text-orange">
            {zine.title.replace("\n", " ")}
          </span>
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/55 md:flex">
            <Sep /> {zine.years} <Sep /> {zine.format} <Sep /> {zine.size}
            <Sep /> {zine.location}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-[12px] tracking-[0.2em] text-paper/80">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              aria-label="Close reader"
              className="flex items-center gap-1.5 border border-paper/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-orange hover:text-ink"
            >
              <Crosshair className="h-3 w-3" /> ESC / CLOSE
            </button>
          </div>
        </div>
      </header>

      {/* ---- stage ---- */}
      <div className="relative z-[1] flex flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-6">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
          className="relative h-full max-h-[78vh] w-full max-w-[1400px] cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
              className="h-full w-full"
            >
              <ZinePageView
                zine={zine}
                page={zine.pages[index]}
                pageIndex={index}
                onZoom={(images, i) => setZoom({ images, index: i })}
              />
            </motion.div>
          </AnimatePresence>
          {/* scan-swap burst, re-fired each page turn */}
          <ZineScanBurst flashKey={index} />

          {/* side arrows */}
          <ReaderArrow side="left" onClick={() => step(-1)} />
          <ReaderArrow side="right" onClick={() => step(1)} />
        </motion.div>
      </div>

      {/* ---- controls + page strip ---- */}
      <footer className="relative z-[2] border-t border-paper/15 bg-ink/40 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[1500px] items-center gap-3 px-4 py-2.5">
          <button
            onClick={() => step(-1)}
            className="border border-paper/40 px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-paper hover:text-ink"
          >
            ◂ Prev
          </button>

          {/* page strip */}
          <div className="scrollbar-none flex flex-1 items-center gap-1.5 overflow-x-auto px-1">
            {zine.pages.map((p, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                aria-label={`Page ${i + 1}`}
                className={`flex h-8 shrink-0 items-center gap-1 border px-2 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors ${
                  i === index
                    ? "border-orange bg-orange/20 text-orange"
                    : "border-paper/25 text-paper/55 hover:border-orange hover:text-orange"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
                <span className="hidden sm:inline">{p.kind}</span>
              </button>
            ))}
          </div>

          <button
            onClick={random}
            className="hidden border border-paper/40 px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-orange hover:text-ink sm:block"
          >
            ⤨ Random
          </button>
          <button
            onClick={() => step(1)}
            className="border border-paper/40 px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.2em] text-paper transition hover:bg-paper hover:text-ink"
          >
            Next ▸
          </button>
        </div>
        {/* footer barcode flourish */}
        <div className="pointer-events-none absolute bottom-1 left-4 hidden items-center gap-2 opacity-40 lg:flex">
          <Barcode seed={`${zine.id}-reader`} color="#e8dfcf" className="h-3 w-20" />
          <AimMark small className="h-3.5 w-3.5 text-orange" />
        </div>
      </footer>

      {/* photo zoom (reused modal), inside the themed scope */}
      <ExpandedPosterModal
        poster={zoomPoster}
        onClose={() => setZoom(null)}
        onPrev={() => stepZoom(-1)}
        onNext={() => stepZoom(1)}
      />
    </motion.aside>
  );
}

function Sep() {
  return <span className="text-orange/70">·</span>;
}

function ReaderArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous page" : "Next page"}
      className={`absolute top-1/2 z-[5] hidden h-12 w-9 -translate-y-1/2 items-center justify-center border border-paper/30 bg-ink/60 font-mono text-paper/80 backdrop-blur-[1px] transition hover:bg-orange hover:text-ink md:flex ${
        side === "left" ? "left-1.5" : "right-1.5"
      }`}
    >
      {side === "left" ? "◂" : "▸"}
    </button>
  );
}

/** orange flash + photocopier scan bar + grain spike — fired on open & each turn */
function ZineScanBurst({ flashKey }: { flashKey: string | number }) {
  return (
    <motion.div
      key={flashKey}
      className="pointer-events-none absolute inset-0 z-[6]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgb(var(--accent-rgb) / 0.45)", mixBlendMode: "screen" }}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
      />
      <motion.div
        className="scanbar"
        initial={{ top: "-25%" }}
        animate={{ top: "115%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <div className="grain-layer animate-grain !opacity-25" />
    </motion.div>
  );
}

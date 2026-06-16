import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Poster } from "../types";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { Crosshair } from "./Crosshair";

interface ExpandedPosterModalProps {
  poster: Poster | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ExpandedPosterModal({
  poster,
  onClose,
  onPrev,
  onNext,
}: ExpandedPosterModalProps) {
  // keyboard controls
  useEffect(() => {
    if (!poster) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [poster, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {poster && (
        <motion.div
          key="poster-modal"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* smoky darkened backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(28,22,16,0.92), rgba(7,7,6,0.97))",
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="scanlines absolute inset-0 opacity-40" />
            <div
              className="absolute inset-0 animate-drift opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 70%, rgba(255,75,11,0.18), transparent 55%)",
              }}
            />
          </motion.div>

          {/* print-scan flash bars + grain burst (keyed to poster id) */}
          <PrintScanBurst key={poster.id} />

          {/* content (NOT re-keyed on next — avoids remounting a layoutId
              node mid-presence, which left the overlay stuck after close) */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 grid max-h-[92vh] w-full max-w-5xl grid-cols-1 overflow-y-auto md:grid-cols-[1fr_0.85fr] paper-panel ink-border"
          >
            {/* ---- the enlarged poster ---- */}
            <motion.div
              layoutId={`poster-${poster.id}`}
              className="relative overflow-hidden border-b-2 border-ink md:border-b-0 md:border-r-2"
            >
              <ArchiveImage
                src={poster.image}
                alt={poster.title.replace("\n", " ")}
                deep
                className="aspect-[4/5] w-full md:aspect-auto md:h-full md:min-h-[460px]"
              />
              {/* chromatic split title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/40 to-transparent p-4 pt-16">
                <h2 className="chroma font-display text-5xl uppercase leading-[0.82] tracking-tightest text-paper sm:text-6xl">
                  {poster.title.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
              </div>
              <span className="absolute left-3 top-3 bg-orange px-2 py-0.5 font-display text-xl leading-none text-ink">
                '{String(poster.year).slice(2)}
              </span>
              <div className="scanlines absolute inset-0" />
            </motion.div>

            {/* ---- metadata panel ---- */}
            <div className="relative flex flex-col gap-4 p-4 sm:p-6">
              {/* close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 flex items-center gap-1.5 border border-ink bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper transition hover:bg-orange hover:text-ink"
              >
                <Crosshair className="h-3 w-3" /> ESC / CLOSE
              </button>

              <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/60">
                <span className="text-orange">{poster.category}</span>
                <span className="h-px flex-1 bg-ink/25" />
                <span>{poster.archiveId}</span>
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.12em]">
                <Field label="Year" value={String(poster.year)} />
                <Field label="Category" value={poster.category} />
                <Field label="Location" value={poster.location} span />
                <Field label="Coordinates" value={poster.coords} span />
              </dl>

              <p className="font-condensed text-base leading-snug text-ink/85 sm:text-lg">
                {poster.description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-1.5">
                {poster.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-ink/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-ink/70"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                <Barcode seed={`${poster.id}-modal`} className="h-6 w-28" />
                {/* prev / next */}
                <div className="flex items-center gap-2">
                  <NavBtn label="◂ PREV" onClick={onPrev} />
                  <NavBtn label="NEXT ▸" onClick={onNext} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  span,
}: {
  label: string;
  value: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <dt className="text-ink/45">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

function NavBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border border-ink px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-paper"
    >
      {label}
    </button>
  );
}

/** orange light-leak flash + scan bar + chromatic burst during open */
function PrintScanBurst() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-20"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden="true"
    >
      {/* orange flash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(255,75,11,0.5)", mixBlendMode: "screen" }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      {/* moving scan bar (photocopier) */}
      <motion.div
        className="scanbar"
        initial={{ top: "-25%" }}
        animate={{ top: "115%" }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      />
      {/* grain burst */}
      <div className="grain-layer !opacity-30 animate-grain" />
    </motion.div>
  );
}

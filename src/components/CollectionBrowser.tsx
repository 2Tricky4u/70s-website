import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { motion } from "framer-motion";
import type { Category, Collection, Poster } from "../types";
import { PosterGrid } from "./PosterGrid";
import { ExpandedPosterModal } from "./ExpandedPosterModal";
import { ArchiveControls, type ViewMode } from "./ArchiveControls";
import { sortPosters, type SortKey } from "../lib/sortPosters";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";
import { DistressedTitle } from "./DistressedTitle";

interface CollectionBrowserProps {
  collection: Collection;
  onClose: () => void;
}

/**
 * Full-screen themed browser for a single collection. Sets --accent-rgb +
 * --duo-hue on its root so every reused component (PosterCard, the photo
 * modal, duotone images) recolors to the collection's theme automatically.
 */
export function CollectionBrowser({ collection, onClose }: CollectionBrowserProps) {
  // map the collection's photos onto Poster shapes so we can reuse PosterGrid
  const posters = useMemo<Poster[]>(
    () =>
      collection.photos.map((ph, i) => ({
        id: ph.id,
        title: ph.title,
        subtitle: collection.theme.era,
        year: 1990 + (i % 9),
        category: collection.title as Category,
        image: ph.image,
        location: ph.meta,
        coords: `FRM ${String(i + 1).padStart(3, "0")} · ${collection.coords}`,
        description: collection.blurb,
        archiveId: `${collection.id.slice(0, 4).toUpperCase()}-${String(
          i + 1
        ).padStart(2, "0")}`,
        tags: [collection.id, "archive", `roll-${Math.floor(i / 6) + 1}`],
        accent: i % 5 === 0 ? "FRESH" : undefined,
      })),
    [collection]
  );

  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<ViewMode>("grid");
  const sorted = useMemo(() => sortPosters(posters, sort), [posters, sort]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = activeId ? sorted.findIndex((p) => p.id === activeId) : -1;
  const activePoster = activeIndex >= 0 ? sorted[activeIndex] : null;

  const step = useCallback(
    (dir: number) => {
      if (activeIndex < 0) return;
      const n = (activeIndex + dir + sorted.length) % sorted.length;
      setActiveId(sorted[n].id);
    },
    [activeIndex, sorted]
  );

  // Esc closes the browser (only when no photo lightbox is open)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !activeId) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, activeId]);

  const themeStyle = {
    "--accent-rgb": collection.theme.accentRgb,
    "--duo-hue": collection.theme.hue,
  } as CSSProperties;

  return (
    <motion.aside
      key={collection.id}
      style={themeStyle}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="paper-panel fixed inset-0 z-[96] overflow-y-auto text-ink"
    >
      {/* print-scan flash on open */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{ background: "rgb(var(--accent-rgb) / 0.5)", mixBlendMode: "screen" }}
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        aria-hidden="true"
      />
      <div className="grain-layer animate-grain" aria-hidden="true" />

      {/* sticky themed header */}
      <header className="ink-panel sticky top-0 z-[4] border-b-2 border-ink text-paper">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2.5">
          <button
            onClick={onClose}
            className="group flex items-center gap-2 font-condensed text-xs font-semibold uppercase tracking-[0.25em] text-paper transition hover:text-orange"
          >
            <span className="text-orange transition-transform group-hover:-translate-x-0.5">
              ◂
            </span>
            Close Archive
          </button>
          <div className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60 sm:flex">
            <AimMark small className="h-5 w-5 text-orange" />
            <span className="text-orange">{collection.theme.era}</span>
            <span className="h-3 w-px bg-paper/30" />
            <span>{collection.count} FILES</span>
            <Barcode seed={collection.id} color="#e8dfcf" className="h-4 w-20 opacity-80" />
          </div>
        </div>
      </header>

      {/* title block */}
      <div className="relative border-b-2 border-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:py-10">
          <div className="mb-2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60">
            <span className="text-orange">COLLECTION</span>
            <span className="h-px flex-1 bg-ink/25" />
            <span>{collection.coords}</span>
          </div>
          <DistressedTitle
            as="h2"
            seed={`browser-${collection.id}`}
            rough
            className="font-display text-[14vw] uppercase leading-[0.82] tracking-tightest text-ink sm:text-7xl lg:text-8xl"
          >
            {collection.title}
          </DistressedTitle>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-xl font-condensed text-base uppercase leading-snug tracking-[0.04em] text-ink/75 sm:text-lg">
              {collection.blurb}
            </p>
            <ArchiveControls
              count={posters.length}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
              tone="light"
            />
          </div>
        </div>
      </div>

      {/* the photo grid (reused) */}
      <PosterGrid
        posters={sorted}
        onOpen={(p) => setActiveId(p.id)}
        view={view}
      />

      {/* themed lightbox (reused), rendered inside the themed scope */}
      <ExpandedPosterModal
        poster={activePoster}
        onClose={() => setActiveId(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </motion.aside>
  );
}

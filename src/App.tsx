import { useMemo, useState, useCallback } from "react";
import { POSTERS } from "./data/posters";
import type { Poster } from "./types";
import { GrainOverlay } from "./components/GrainOverlay";
import { CursorGlow } from "./components/CursorGlow";
import { DistressDefs } from "./components/DistressDefs";
import { FloatingMenu } from "./components/FloatingMenu";
import { StickyFooterBar } from "./components/StickyFooterBar";
import { MusicPlayerProvider } from "./components/MusicPlayer";
import { SystemHeader } from "./components/SystemHeader";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { FilterBar, type Filter } from "./components/FilterBar";
import { type ViewMode } from "./components/ArchiveControls";
import { sortPosters, type SortKey } from "./lib/sortPosters";
import { PosterGrid } from "./components/PosterGrid";
import { ExpandedPosterModal } from "./components/ExpandedPosterModal";
import { Collections } from "./components/Collections";
import { Manifesto } from "./components/Manifesto";
import { Footer } from "./components/Footer";

export default function App() {
  const [filter, setFilter] = useState<Filter>("All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [view, setView] = useState<ViewMode>("grid");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? POSTERS
        : POSTERS.filter((p) => p.category === filter),
    [filter]
  );
  const visible = useMemo(() => sortPosters(filtered, sort), [filtered, sort]);

  // the modal navigates within the *full* archive so prev/next never dead-ends
  const open = useCallback((poster: Poster) => setActiveId(poster.id), []);
  const close = useCallback(() => setActiveId(null), []);

  const activeIndex = activeId
    ? POSTERS.findIndex((p) => p.id === activeId)
    : -1;
  const activePoster = activeIndex >= 0 ? POSTERS[activeIndex] : null;

  const step = useCallback(
    (dir: number) => {
      if (activeIndex < 0) return;
      const next = (activeIndex + dir + POSTERS.length) % POSTERS.length;
      setActiveId(POSTERS[next].id);
    },
    [activeIndex]
  );

  return (
    <MusicPlayerProvider>
    <div className="relative min-h-screen">
      <DistressDefs />
      <GrainOverlay />
      <CursorGlow />
      <FloatingMenu />
      <StickyFooterBar />

      {/* full-bleed system band (blends edge-to-edge with the dark stage) */}
      <SystemHeader />

      {/* framed "white box" — centred on the dark stage, margin left/right only */}
      <div className="mx-auto max-w-[1600px] px-2 sm:px-3">
        <div className="site-frame">
          <header className="relative">
            <Navigation />
          </header>
          <main>
            <Hero />
            <FilterBar
              active={filter}
              onChange={setFilter}
              count={visible.length}
              sort={sort}
              onSortChange={setSort}
              view={view}
              onViewChange={setView}
            />
            <PosterGrid posters={visible} onOpen={open} view={view} />
            <Collections />
            <Manifesto />
          </main>
        </div>
      </div>

      {/* full-bleed footer */}
      <Footer />

      <ExpandedPosterModal
        poster={activePoster}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
    </MusicPlayerProvider>
  );
}

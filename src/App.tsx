import { useMemo, useState, useCallback } from "react";
import { POSTERS } from "./data/posters";
import type { Poster } from "./types";
import { GrainOverlay } from "./components/GrainOverlay";
import { CursorGlow } from "./components/CursorGlow";
import { DistressDefs } from "./components/DistressDefs";
import { SystemHeader } from "./components/SystemHeader";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { FilterBar, type Filter } from "./components/FilterBar";
import { PosterGrid } from "./components/PosterGrid";
import { ExpandedPosterModal } from "./components/ExpandedPosterModal";
import { Collections } from "./components/Collections";
import { Manifesto } from "./components/Manifesto";
import { Footer } from "./components/Footer";

export default function App() {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? POSTERS
        : POSTERS.filter((p) => p.category === filter),
    [filter]
  );

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
    <div className="relative min-h-screen">
      <DistressDefs />
      <GrainOverlay />
      <CursorGlow />

      <header className="relative">
        <SystemHeader />
        <Navigation />
      </header>

      <main>
        <Hero />
        <FilterBar active={filter} onChange={setFilter} count={filtered.length} />
        <PosterGrid posters={filtered} onOpen={open} />
        <Collections />
        <Manifesto />
      </main>

      <Footer />

      <ExpandedPosterModal
        poster={activePoster}
        onClose={close}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}

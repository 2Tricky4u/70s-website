import { AnimatePresence, motion } from "framer-motion";
import type { Poster } from "../types";
import { PosterCard } from "./PosterCard";
import { WornLayer } from "./WornLayer";

interface PosterGridProps {
  posters: Poster[];
  onOpen: (poster: Poster) => void;
}

export function PosterGrid({ posters, onOpen }: PosterGridProps) {
  return (
    <section className="paper-panel relative border-b-2 border-ink">
      <WornLayer seed="poster-grid" large amount={0.14} />
      <div className="relative z-[2] mx-auto max-w-[1600px] px-3 py-6 sm:px-4 sm:py-8">
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {posters.map((poster, i) => (
              <PosterCard
                key={poster.id}
                poster={poster}
                index={i}
                onOpen={onOpen}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {posters.length === 0 && (
          <div className="grid place-items-center py-20 text-center font-mono text-sm uppercase tracking-[0.25em] text-ink/50">
            <span>NO FILES IN THIS DRAWER</span>
            <span className="mt-2 text-orange">— TRY ANOTHER CATEGORY —</span>
          </div>
        )}
      </div>
    </section>
  );
}

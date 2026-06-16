import { motion } from "framer-motion";
import { COLLECTIONS } from "../data/collections";
import { ArchiveImage } from "./ArchiveImage";
import { Crosshair } from "./Crosshair";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";

export function Collections() {
  return (
    <section
      id="collections"
      data-tex="c"
      className="ink-panel relative border-b-2 border-ink text-paper"
    >
      <WornLayer seed="collections-sec" ink amount={0.08} />
      <div className="relative z-[2] mx-auto max-w-[1600px] px-4 py-12 sm:py-16">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-paper/20 pb-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-orange">
              SECTION 02 / CURATED
            </span>
            <DistressedTitle
              as="h2"
              seed="collections-h2"
              dark
              rough
              className="mt-1 font-display text-5xl uppercase leading-none tracking-tightest sm:text-7xl"
            >
              Collections
            </DistressedTitle>
          </div>
          <p className="max-w-xs font-condensed text-sm uppercase leading-snug tracking-[0.05em] text-paper/60">
            Folders pulled from the cabinet. Each one a different room of the
            decade.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden border border-paper/25 bg-ink-soft ${
                i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ArchiveImage
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="scanlines absolute inset-0 opacity-50" />
                {/* folder tab */}
                <span className="absolute left-0 top-3 bg-orange px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
                  {c.coords}
                </span>
                <span className="absolute right-3 top-3 font-display text-3xl leading-none text-paper/90">
                  {String(c.count).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 p-4">
                <div>
                  <DistressedTitle
                    as="h3"
                    seed={c.id}
                    dark
                    className="font-display text-3xl uppercase leading-none tracking-tightest transition-colors group-hover:text-orange"
                  >
                    {c.title}
                  </DistressedTitle>
                  <p className="mt-1.5 max-w-xs font-condensed text-sm leading-snug text-paper/65">
                    {c.blurb}
                  </p>
                </div>
                <Crosshair className="mt-1 h-5 w-5 shrink-0 text-paper/40 transition-colors group-hover:text-orange" />
              </div>

              {/* hover light leak */}
              <div className="light-leak opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Barcode } from "./Barcode";
import { WornLayer } from "./WornLayer";
import { distressVars } from "../lib/grit";

export function Manifesto() {
  return (
    <section
      id="about"
      data-tex="2"
      className="paper-panel relative overflow-hidden border-b-2 border-ink"
    >
      <WornLayer seed="manifesto-sec" large amount={0.16} />
      {/* marginal vertical tech note */}
      <span className="writing-vertical absolute right-2 top-1/2 z-[3] hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-ink/35 lg:block">
        MANIFESTO / DOC NN-00 / DO NOT FOLD
      </span>

      <div className="relative z-[2] mx-auto max-w-[1300px] px-4 py-14 sm:py-20">
        <div className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ink/60">
          <span className="text-orange">SECTION 04</span>
          <span className="h-px flex-1 bg-ink/30" />
          <span>THE ARCHIVE / WHY</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={distressVars("manifesto-h2")}
          className="title-distress title-rough font-display text-[10vw] uppercase leading-[0.86] tracking-tightest text-ink sm:text-7xl lg:text-8xl"
        >
          This is a living archive of{" "}
          <span className="relative text-orange">
            fragments
            <span className="absolute -top-3 left-0 font-mono text-[10px] tracking-[0.2em] text-ink/50">
              [001]
            </span>
          </span>
          , noise, friends, streets, rooms, cars, music, and{" "}
          <span className="text-stroke-ink">half-remembered</span> nights.
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 font-condensed text-lg leading-relaxed text-ink/80 sm:text-xl">
            <p>
              We weren't documenting anything. We were just there — with cheap
              cameras, borrowed tape, and too much time. The flash was too
              bright, the focus was wrong, and somehow that's exactly why it
              still feels true.
            </p>
            <p>
              <span className="bg-orange px-1 text-ink">NINETEEN NINETY</span> is
              a refusal to let those frames dissolve. Every scan keeps its
              scratches. Every print keeps its misregistration. Nothing here is
              restored — it's <em className="not-italic text-orange">kept</em>.
            </p>
          </div>

          <aside className="space-y-4 border-l-2 border-ink/30 pl-5 font-mono text-[12px] uppercase leading-relaxed tracking-[0.1em] text-ink/65">
            <p>
              <span className="text-orange">›</span> Sourced from shoeboxes,
              hard drives & dead phones.
            </p>
            <p>
              <span className="text-orange">›</span> No filters. Only the ones
              the lab gave us in 1994.
            </p>
            <p>
              <span className="text-orange">›</span> Submitted by friends,
              strangers, and people we lost touch with.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Barcode seed="manifesto" className="h-7 w-32" />
              <span className="text-ink/45">REV. 1999.12</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

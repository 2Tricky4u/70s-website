import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ZINES } from "../data/zines";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { ZineCover } from "./ZineCover";
import { ZineReader } from "./ZineReader";

const STACK_ROT = ["-7deg", "5deg", "-3deg"];

export function Zines() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openZine = ZINES.find((z) => z.id === openId) ?? null;
  const issueCount = ZINES.filter((z) => z.status !== "coming-soon").length;

  return (
    <section
      id="zines"
      data-tex="z"
      className="ink-panel relative overflow-hidden border-b-2 border-ink text-paper"
    >
      <WornLayer seed="zines-sec" ink large amount={0.12} />
      {/* marginal vertical tech note */}
      <span className="writing-vertical absolute right-2 top-1/2 z-[3] hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-paper/25 lg:block">
        ARCHIVE SERIES 02 / DO NOT BEND
      </span>

      <div className="relative z-[2] mx-auto max-w-[1600px] px-4 py-14 sm:py-20">
        {/* ---- hero ---- */}
        <div className="relative mb-12 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/55">
              <span className="text-orange">SECTION 03</span>
              <span className="h-px w-16 bg-paper/30" />
              <span>THE RACK</span>
            </div>
            <DistressedTitle
              as="h2"
              seed="zines-hero"
              dark
              rough
              className="font-display text-[22vw] uppercase leading-[0.78] tracking-tightest text-paper sm:text-[12rem]"
            >
              Zines
            </DistressedTitle>
            <p className="mt-2 font-condensed text-lg uppercase tracking-[0.06em] text-paper/70 sm:text-2xl">
              Self-published memory issues / 1990—1999
            </p>
          </div>

          {/* messy rotated stack of covers + metadata */}
          <div className="flex flex-col gap-6">
            <div className="relative mx-auto h-44 w-full max-w-xs sm:h-52">
              {ZINES.slice(0, 3).map((z, i) => (
                <div
                  key={z.id}
                  className="crop-marks absolute left-1/2 top-1/2 w-28 border border-ink bg-paper p-1 shadow-[0_8px_26px_rgba(0,0,0,0.6)] sm:w-32"
                  style={{
                    transform: `translate(-50%,-50%) rotate(${STACK_ROT[i]}) translateX(${
                      (i - 1) * 34
                    }px)`,
                    zIndex: 3 - i,
                  }}
                >
                  <ArchiveImage
                    src={z.cover}
                    alt={z.title.replace("\n", " ")}
                    className="aspect-[4/5] w-full"
                  />
                </div>
              ))}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-paper/20 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
              <Meta label="Printed" value="DIGITALLY" />
              <Meta label="Series" value="ARCHIVE 02" />
              <Meta label="Run" value="LIMITED MEMORY" />
              <Meta label="Issues" value={String(issueCount).padStart(3, "0")} />
              <div className="col-span-2 flex items-center gap-3 pt-1">
                <Barcode seed="zines-hero-bc" color="#e8dfcf" className="h-6 w-32" />
                <AimMark small className="h-5 w-5 text-orange" />
              </div>
            </dl>
          </div>
        </div>

        {/* ---- the rack ---- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {ZINES.map((z, i) => (
            <ZineCover key={z.id} zine={z} index={i} onOpen={() => setOpenId(z.id)} />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-paper/40">
          All zines are scanned from original copies — not perfect.
        </p>
      </div>

      <AnimatePresence>
        {openZine && (
          <ZineReader zine={openZine} onClose={() => setOpenId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-paper/40">{label}</dt>
      <dd className="mt-0.5 text-paper">{value}</dd>
    </div>
  );
}

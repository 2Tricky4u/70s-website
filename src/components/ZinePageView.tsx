import type { CSSProperties } from "react";
import type { Zine, ZinePage } from "../types";
import { ArchiveImage } from "./ArchiveImage";
import { Barcode } from "./Barcode";
import { AimMark } from "./AimMark";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { seeded } from "../lib/grit";

interface ZinePageViewProps {
  zine: Zine;
  page: ZinePage;
  pageIndex: number;
  onZoom: (images: string[], index: number) => void;
}

const TAPE_ROT = ["-4deg", "3deg", "-2.5deg", "5deg"];

/** Renders one zine page; each `kind` is a distinct on-theme composition. */
export function ZinePageView({ zine, page, pageIndex, onZoom }: ZinePageViewProps) {
  const imgs = page.images ?? [];
  const seed = `${zine.id}-p${pageIndex}`;

  return (
    <div className="zine-page paper-panel relative h-full w-full overflow-hidden border-2 border-ink text-ink">
      <WornLayer seed={seed} large amount={0.14} />
      <div className="relative z-[2] h-full w-full overflow-y-auto scrollbar-none">
        {renderKind()}
      </div>
      {/* center binding shadow */}
      <span
        className="zine-fold pointer-events-none absolute inset-y-0 left-1/2 z-[3] hidden w-px -translate-x-1/2 md:block"
        aria-hidden="true"
      />
    </div>
  );

  function renderKind() {
    switch (page.kind) {
      case "cover":
        return (
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-between gap-4 p-6 sm:p-8">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">
                <span className="bg-orange px-2 py-0.5 text-ink">ISSUE {zine.issueNo}</span>
                <AimMark small className="h-6 w-6 text-orange" />
              </div>
              <DistressedTitle
                as="h2"
                seed={`${seed}-t`}
                rough
                className="font-display text-6xl uppercase leading-[0.78] tracking-tightest text-ink sm:text-7xl lg:text-8xl"
              >
                {(page.title ?? zine.title).split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </DistressedTitle>
              <div className="space-y-3">
                <p className="font-condensed text-lg uppercase tracking-[0.05em] text-ink/75">
                  {page.caption}
                </p>
                <div className="flex items-center gap-3">
                  <Barcode seed={`${seed}-bc`} className="h-7 w-32" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    {zine.archiveId}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onZoom(imgs, 0)}
              className="group relative block min-h-[40vh] border-t-2 border-ink md:border-l-2 md:border-t-0"
            >
              <ArchiveImage src={imgs[0]} alt={zine.title} deep className="h-full w-full" />
              <span className="scanlines absolute inset-0" />
              <ZoomHint />
            </button>
          </div>
        );

      case "full":
        return (
          <div className="relative h-full min-h-[50vh]">
            <button
              type="button"
              onClick={() => onZoom(imgs, 0)}
              className="group absolute inset-0 block"
            >
              <ArchiveImage src={imgs[0]} alt={page.caption ?? zine.title} deep className="h-full w-full" />
              <ZoomHint />
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-5 pt-20 sm:p-8">
              {page.caption && (
                <h3 className="chroma font-display text-4xl uppercase leading-[0.85] tracking-tightest text-paper sm:text-6xl">
                  {page.caption}
                </h3>
              )}
              {page.notes?.map((n, i) => (
                <p key={i} className="zine-hand mt-2 text-lg text-paper/85 sm:text-xl">
                  {n}
                </p>
              ))}
            </div>
            <span className="scanlines absolute inset-0" />
          </div>
        );

      case "contact":
        return (
          <div className="flex h-full flex-col p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/60">
              <span className="text-orange">{page.title ?? "CONTACT SHEET"}</span>
              <span className="h-px flex-1 bg-ink/25" />
              <span>{zine.archiveId}</span>
            </div>
            <div className="zine-filmstrip grid flex-1 grid-cols-3 gap-2 sm:grid-cols-4">
              {imgs.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onZoom(imgs, i)}
                  className="group relative block overflow-hidden border border-ink/70 bg-ink/5"
                >
                  <ArchiveImage src={src} alt={`frame ${i + 1}`} className="aspect-[4/5] w-full" />
                  <span className="absolute bottom-0.5 right-1 font-mono text-[7px] uppercase tracking-[0.1em] text-paper/80">
                    {String(i + 1).padStart(2, "0")}A
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case "collage":
        return (
          <div className="relative h-full min-h-[50vh] overflow-hidden p-5">
            <h3 className="absolute left-5 top-4 z-[4] font-display text-3xl uppercase tracking-tightest text-ink sm:text-4xl">
              {page.title}
            </h3>
            {imgs.map((src, i) => {
              const r = seeded(`${seed}-${i}`);
              const top = 8 + r() * 45;
              const left = 6 + r() * 55;
              const w = 34 + r() * 22;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onZoom(imgs, i)}
                  className="group absolute border-2 border-paper bg-paper p-1 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                  style={
                    {
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${w}%`,
                      transform: `rotate(${TAPE_ROT[i % TAPE_ROT.length]})`,
                      zIndex: 2 + i,
                    } as CSSProperties
                  }
                >
                  <span className="zine-tape" aria-hidden="true" />
                  <ArchiveImage src={src} alt={`collage ${i + 1}`} className="aspect-[5/4] w-full" />
                </button>
              );
            })}
            <div className="absolute bottom-4 right-5 z-[4] flex flex-wrap justify-end gap-1.5">
              {page.labels?.map((l) => (
                <span
                  key={l}
                  className="border border-ink/50 bg-paper/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-ink/70"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        );

      case "manifesto":
        return (
          <div className="flex h-full min-h-[50vh] flex-col justify-center p-8 sm:p-12">
            <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-orange">
              MANIFESTO / {zine.archiveId}
            </span>
            <DistressedTitle
              as="h3"
              seed={`${seed}-m`}
              rough
              className="font-display text-5xl uppercase leading-[0.85] tracking-tightest text-ink sm:text-7xl lg:text-8xl"
            >
              {page.lines?.map((l, i) => (
                <span key={i} className="block">
                  {i % 2 === 1 ? <span className="text-orange">{l}</span> : l}
                </span>
              ))}
            </DistressedTitle>
          </div>
        );

      case "map":
        return (
          <div className="zine-map relative flex h-full min-h-[50vh] flex-col justify-between p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-orange">
                  ARCHIVE LOCATION
                </span>
                <h3 className="mt-1 font-display text-4xl uppercase leading-[0.85] tracking-tightest text-ink sm:text-6xl">
                  {page.title}
                </h3>
              </div>
              <AimMark className="h-16 w-16 text-orange sm:h-24 sm:w-24" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {page.labels?.map((l, i) => (
                <div
                  key={l}
                  className="flex items-center gap-2 border border-ink/30 bg-paper/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/75"
                >
                  <span className="text-orange">{String(i + 1).padStart(2, "0")}</span>
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
              <span>{page.coords ?? zine.coords}</span>
              <Barcode seed={`${seed}-map`} className="h-5 w-24" />
            </div>
          </div>
        );

      case "closing":
        return (
          <div className="flex h-full min-h-[50vh] flex-col items-center justify-center gap-6 p-8 text-center">
            <DistressedTitle
              as="h3"
              seed={`${seed}-end`}
              rough
              className="font-display text-6xl uppercase leading-[0.8] tracking-tightest text-ink sm:text-8xl"
            >
              End of
              <span className="block text-orange">Issue</span>
            </DistressedTitle>
            <div className="space-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
              {page.lines?.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
              <p className="pt-1 text-ink/45">{zine.archiveId} · {zine.edition}</p>
            </div>
            <a
              href="#contact"
              className="border-2 border-ink bg-ink px-5 py-2.5 font-condensed text-sm uppercase tracking-[0.2em] text-paper transition hover:bg-orange hover:text-ink"
            >
              Submit a Memory ↗
            </a>
            <Barcode seed={`${seed}-end-bc`} className="h-6 w-32" />
          </div>
        );

      default:
        return null;
    }
  }
}

function ZoomHint() {
  return (
    <span className="pointer-events-none absolute right-2 top-2 border border-orange bg-ink/70 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-orange opacity-0 transition-opacity duration-200 group-hover:opacity-100">
      ⊕ ZOOM
    </span>
  );
}

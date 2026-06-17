import { useEffect, useRef, useState } from "react";
import { SORTS, type SortKey } from "../lib/sortPosters";

export type ViewMode = "grid" | "list";

interface ArchiveControlsProps {
  count: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  /** "dark" reads on the ink FilterBar, "light" on the paper title block */
  tone?: "dark" | "light";
}

/**
 * Shared archive controls: file count, sort dropdown and grid/list toggle.
 * Reused by the main FilterBar (tone="dark") and CollectionBrowser (tone="light").
 */
export function ArchiveControls({
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
  tone = "dark",
}: ArchiveControlsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close the sort menu on outside-click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const dark = tone === "dark";
  const muted = dark ? "text-paper/70" : "text-ink/65";
  const idleBorder = dark ? "border-paper/30" : "border-ink/30";
  const menuPanel = dark
    ? "ink-panel border-paper/30 text-paper"
    : "paper-panel border-ink/30 text-ink";
  const activeLabel = SORTS.find((s) => s.key === sort)?.label ?? "NEWEST";

  return (
    <div
      className={`flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] ${muted}`}
    >
      <span className="text-orange">{count} FILES</span>

      {/* SORT dropdown */}
      <div ref={ref} className="relative hidden md:block">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-orange"
        >
          <span>SORT:</span>
          <span className="text-orange">{activeLabel}</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>

        {open && (
          <ul
            role="listbox"
            className={`absolute right-0 top-[calc(100%+6px)] z-50 min-w-[120px] border ${menuPanel}`}
          >
            {SORTS.map((s) => {
              const isActive = s.key === sort;
              return (
                <li key={s.key} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => {
                      onSortChange(s.key);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left transition-colors hover:bg-orange hover:text-ink ${
                      isActive ? "text-orange" : ""
                    }`}
                  >
                    {s.label}
                    {isActive && <span>●</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* grid / list toggle */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onViewChange("grid")}
          aria-label="Grid view"
          aria-pressed={view === "grid"}
          className={`grid h-5 w-5 place-items-center border transition-colors ${
            view === "grid"
              ? "border-orange bg-orange/20 text-orange"
              : `${idleBorder} hover:border-orange hover:text-orange`
          }`}
        >
          ▦
        </button>
        <button
          type="button"
          onClick={() => onViewChange("list")}
          aria-label="List view"
          aria-pressed={view === "list"}
          className={`grid h-5 w-5 place-items-center border transition-colors ${
            view === "list"
              ? "border-orange bg-orange/20 text-orange"
              : `${idleBorder} hover:border-orange hover:text-orange`
          }`}
        >
          ▤
        </button>
      </div>
    </div>
  );
}

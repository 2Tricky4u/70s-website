import type { Category } from "../types";
import { CATEGORIES } from "../data/posters";

export type Filter = "All" | Category;

interface FilterBarProps {
  active: Filter;
  onChange: (f: Filter) => void;
  count: number;
}

const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function FilterBar({ active, onChange, count }: FilterBarProps) {
  return (
    <div
      id="archive"
      className="sticky top-0 z-30 border-b-2 border-ink ink-panel text-paper"
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-3 py-2">
        {/* scrollable chip row */}
        <div className="scrollbar-none -mx-1 flex flex-1 items-center gap-1.5 overflow-x-auto px-1 py-0.5">
          {FILTERS.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                onClick={() => onChange(f)}
                className={`relative whitespace-nowrap border px-3 py-1 font-condensed text-[12px] uppercase tracking-[0.18em] transition-all duration-200 ${
                  isActive
                    ? "border-orange bg-orange text-ink"
                    : "border-paper/30 text-paper/75 hover:border-orange hover:text-orange"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* right controls */}
        <div className="hidden items-center gap-4 pl-2 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70 sm:flex">
          <span className="text-orange">{count} FILES</span>
          <span className="hidden md:inline">SORT: NEWEST ▾</span>
          <div className="hidden items-center gap-1 lg:flex">
            <span className="grid h-5 w-5 place-items-center border border-orange bg-orange/20 text-orange">
              ▦
            </span>
            <span className="grid h-5 w-5 place-items-center border border-paper/30">
              ▤
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

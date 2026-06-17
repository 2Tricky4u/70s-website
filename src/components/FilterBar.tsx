import type { Category } from "../types";
import { CATEGORIES } from "../data/posters";
import { ArchiveControls, type ViewMode } from "./ArchiveControls";
import type { SortKey } from "../lib/sortPosters";

export type Filter = "All" | Category;

interface FilterBarProps {
  active: Filter;
  onChange: (f: Filter) => void;
  count: number;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const FILTERS: Filter[] = ["All", ...CATEGORIES];

export function FilterBar({
  active,
  onChange,
  count,
  sort,
  onSortChange,
  view,
  onViewChange,
}: FilterBarProps) {
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
                className={`relative whitespace-nowrap border px-3 py-1 font-plex text-[11px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
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
        <div className="hidden shrink-0 pl-2 sm:block">
          <ArchiveControls
            count={count}
            sort={sort}
            onSortChange={onSortChange}
            view={view}
            onViewChange={onViewChange}
            tone="dark"
          />
        </div>
      </div>
    </div>
  );
}

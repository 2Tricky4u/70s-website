import type { Poster } from "../types";

export type SortKey = "newest" | "oldest" | "az";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "newest", label: "NEWEST" },
  { key: "oldest", label: "OLDEST" },
  { key: "az", label: "A–Z" },
];

/** stable copy of `list` sorted by the chosen key (newest = year desc) */
export function sortPosters(list: Poster[], key: SortKey): Poster[] {
  const copy = [...list];
  switch (key) {
    case "oldest":
      return copy.sort((a, b) => a.year - b.year);
    case "az":
      return copy.sort((a, b) =>
        a.title.replace(/\n/g, " ").localeCompare(b.title.replace(/\n/g, " "))
      );
    case "newest":
    default:
      return copy.sort((a, b) => b.year - a.year);
  }
}

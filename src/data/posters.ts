import type { Category, Poster } from "../types";
import { resolveImage } from "../lib/imageSrc";
import postersData from "./posters.json";

export const CATEGORIES: Category[] = [
  "Friends",
  "Nightlife",
  "Street",
  "Skate",
  "Family",
  "Travel",
  "Music",
  "Cars",
  "Culture",
];

/**
 * The archive is sourced from `posters.json` (edit that file to add photos).
 * Each entry's `image` is a Cloudinary public ID or any full URL — see
 * `lib/imageSrc.ts` and `PHOTOS.md`. `resolveImage` turns it into a real src;
 * `ArchiveImage` falls back to a procedural placeholder if it fails to load.
 */
export const POSTERS: Poster[] = (postersData as Poster[]).map((p) => ({
  ...p,
  category: p.category as Category,
  image: resolveImage(p.image),
}));

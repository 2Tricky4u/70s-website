import type { Zine, ZinePage } from "../types";
import { resolveImage } from "../lib/imageSrc";
import zinesData from "./zines.json";

/**
 * Zines are sourced from `zines.json`. Every image (cover + each page's
 * `images`) is run through `resolveImage`, so values may be Cloudinary public
 * IDs or full URLs (see `lib/imageSrc.ts` and `PHOTOS.md`).
 */
export const ZINES: Zine[] = (zinesData as Zine[]).map((z) => ({
  ...z,
  cover: resolveImage(z.cover),
  pages: z.pages.map(
    (p): ZinePage => ({
      ...p,
      images: p.images?.map(resolveImage),
    })
  ),
}));

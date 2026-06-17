import type { Collection, CollectionPhoto } from "../types";
import { resolveImage } from "../lib/imageSrc";
import collectionsData from "./collections.json";

/** raw manifest shape: like Collection but `cover` instead of derived fields */
interface CollectionEntry extends Omit<Collection, "count" | "image" | "photos"> {
  cover: string;
  photos: CollectionPhoto[];
}

/**
 * Collections are sourced from `collections.json` (edit that file to add
 * photos to a collection's `photos` array). `image`/`cover` values are
 * Cloudinary public IDs or full URLs (see `lib/imageSrc.ts` and `PHOTOS.md`).
 * `count` is derived from the actual photos so displayed counts stay honest.
 */
export const COLLECTIONS: Collection[] = (collectionsData as CollectionEntry[]).map(
  ({ cover, photos, ...rest }) => ({
    ...rest,
    image: resolveImage(cover),
    count: photos.length,
    photos: photos.map((ph) => ({ ...ph, image: resolveImage(ph.image) })),
  })
);

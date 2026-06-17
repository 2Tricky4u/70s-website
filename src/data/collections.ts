import type { Collection, CollectionPhoto } from "../types";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1000/700`;
const photoImg = (seed: string) => `https://picsum.photos/seed/${seed}/900/1150`;

/** build N seeded photos for a collection (prefixed ids avoid layoutId clashes) */
function buildPhotos(collId: string, count: number, meta: string): CollectionPhoto[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const roll = String(Math.floor(i / 6) + 1).padStart(2, "0");
    const frame = String((i % 6) + 1).padStart(2, "0");
    return {
      id: `col-${collId}-${String(n).padStart(2, "0")}`,
      title: `ROLL ${roll} / FRAME ${frame}`,
      meta,
      image: photoImg(`${collId}-${n}`),
    };
  });
}

/** assemble a collection with `count` derived from its photos (single source of truth) */
function collection(
  c: Omit<Collection, "count" | "photos"> & { photos: CollectionPhoto[] }
): Collection {
  return { ...c, count: c.photos.length };
}

export const COLLECTIONS: Collection[] = [
  collection({
    id: "nightlife",
    title: "Nightlife",
    blurb: "Strobes, smoke and unmarked doors. The decade after midnight.",
    image: img("nn-coll-nightlife"),
    coords: "FOLDER / A-01",
    theme: { accentRgb: "201 84 222", hue: "240deg", era: "AFTER DARK · 4AM" },
    photos: buildPhotos("nightlife", 14, "UNMARKED DOOR · 4AM"),
  }),
  collection({
    id: "street-summer",
    title: "Street Summer",
    blurb: "Cracked hydrants, hot asphalt, the block before everyone left.",
    image: img("nn-coll-street"),
    coords: "FOLDER / A-02",
    theme: { accentRgb: "255 75 11", hue: "-18deg", era: "HOT ASPHALT · SUMMER" },
    photos: buildPhotos("street-summer", 16, "OUR BLOCK · HYDRANT OPEN"),
  }),
  collection({
    id: "analog-family",
    title: "Analog Family",
    blurb: "Camcorder tapes, porch light, the people who built the archive.",
    image: img("nn-coll-family"),
    coords: "FOLDER / A-03",
    theme: { accentRgb: "224 158 70", hue: "-30deg", era: "SUNDAY · SUPER-8" },
    photos: buildPhotos("analog-family", 18, "THE OLD PORCH · CAMCORDER"),
  }),
  collection({
    id: "cars-roads",
    title: "Cars & Roads",
    blurb: "Rust, tape decks and horizons that never got any closer.",
    image: img("nn-coll-cars"),
    coords: "FOLDER / A-04",
    theme: { accentRgb: "92 156 214", hue: "150deg", era: "ROUTE · RUST" },
    photos: buildPhotos("cars-roads", 12, "SOMEWHERE WEST · NO MAP"),
  }),
  collection({
    id: "music-rooms",
    title: "Music Rooms",
    blurb: "Basements, bedroom studios and the warm hiss of dubbed tape.",
    image: img("nn-coll-music"),
    coords: "FOLDER / A-05",
    theme: { accentRgb: "138 196 74", hue: "70deg", era: "DUBBED · 120 MIN" },
    photos: buildPhotos("music-rooms", 15, "BEDROOM STUDIO · DUBBED x40"),
  }),
];

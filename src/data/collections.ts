import type { Collection } from "../types";

const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/1000/700`;

export const COLLECTIONS: Collection[] = [
  {
    id: "nightlife",
    title: "Nightlife",
    count: 48,
    blurb: "Strobes, smoke and unmarked doors. The decade after midnight.",
    image: img("nn-coll-nightlife"),
    coords: "FOLDER / A-01",
  },
  {
    id: "street-summer",
    title: "Street Summer",
    count: 63,
    blurb: "Cracked hydrants, hot asphalt, the block before everyone left.",
    image: img("nn-coll-street"),
    coords: "FOLDER / A-02",
  },
  {
    id: "analog-family",
    title: "Analog Family",
    count: 91,
    blurb: "Camcorder tapes, porch light, the people who built the archive.",
    image: img("nn-coll-family"),
    coords: "FOLDER / A-03",
  },
  {
    id: "cars-roads",
    title: "Cars & Roads",
    count: 37,
    blurb: "Rust, tape decks and horizons that never got any closer.",
    image: img("nn-coll-cars"),
    coords: "FOLDER / A-04",
  },
  {
    id: "music-rooms",
    title: "Music Rooms",
    count: 55,
    blurb: "Basements, bedroom studios and the warm hiss of dubbed tape.",
    image: img("nn-coll-music"),
    coords: "FOLDER / A-05",
  },
];

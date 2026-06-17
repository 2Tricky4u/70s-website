export type Category =
  | "Friends"
  | "Nightlife"
  | "Street"
  | "Skate"
  | "Family"
  | "Travel"
  | "Music"
  | "Cars"
  | "Culture";

export interface Poster {
  id: string;
  title: string;
  subtitle?: string;
  year: number;
  category: Category;
  /** remote photo URL (duotone-filtered); fallback CSS used if it fails */
  image: string;
  location: string;
  coords: string;
  description: string;
  archiveId: string;
  tags: string[];
  /** "FRESH" | "WARM" | small accent label shown on card */
  accent?: string;
}

export interface CollectionTheme {
  /** space-separated RGB channels for --accent-rgb, e.g. "120 90 205" */
  accentRgb: string;
  /** duotone hue-rotate for --duo-hue, e.g. "180deg" */
  hue: string;
  /** small era / mood label shown in the browser + card */
  era: string;
}

export interface CollectionPhoto {
  id: string;
  title: string;
  meta: string;
  image: string;
}

export interface Collection {
  id: string;
  title: string;
  count: number;
  blurb: string;
  image: string;
  coords: string;
  theme: CollectionTheme;
  photos: CollectionPhoto[];
}

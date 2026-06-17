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

export interface ZineTheme {
  /** space-separated RGB channels for --accent-rgb */
  accentRgb: string;
  /** duotone hue-rotate for --duo-hue */
  hue: string;
  /** short mood label, e.g. "CINEMATIC · ORANGE HEADLIGHTS" */
  mood: string;
}

export type ZinePageKind =
  | "cover"
  | "contact"
  | "full"
  | "collage"
  | "manifesto"
  | "map"
  | "closing"
  | "story";

/** One page in a zine. Fields are optional; each `kind` uses what it needs. */
export interface ZinePage {
  kind: ZinePageKind;
  /** resolved image URLs the layout draws (count varies by kind) */
  images?: string[];
  title?: string;
  /** distressed caption shown over/under a photo */
  caption?: string;
  /** handwritten-style note lines */
  notes?: string[];
  /** big manifesto / closing lines */
  lines?: string[];
  /** map page place labels */
  labels?: string[];
  coords?: string;
}

export interface Zine {
  id: string;
  /** zero-padded issue number string, e.g. "001" */
  issueNo: string;
  title: string;
  /** e.g. "1990—1993" */
  years: string;
  location: string;
  coords: string;
  /** e.g. "XEROX / COLLAGE" */
  format: string;
  /** e.g. "5.5 x 8.5 in" */
  size: string;
  edition: string;
  archiveId: string;
  photoCount: number;
  noteCount: number;
  blurb: string;
  theme: ZineTheme;
  cover: string;
  /** optional ambient track looped while this issue's reader is open */
  sound?: string;
  /** marks a placeholder rack card that doesn't open */
  status?: "coming-soon";
  pages: ZinePage[];
}

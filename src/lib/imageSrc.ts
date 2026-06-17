/**
 * Resolves a manifest `image` value into a final <img> src.
 *
 * A manifest entry's `image` may be:
 *   - a full URL  ("https://…")        → used as-is (any host: Cloudinary, etc.)
 *   - a Cloudinary public ID ("archive/basement-sessions") → expanded below
 *
 * Set CLOUDINARY_CLOUD once after creating your free Cloudinary account
 * (Dashboard → "Cloud name"). Until then, full-URL entries still work, so the
 * site keeps rendering with its placeholder photos.
 */
export const CLOUDINARY_CLOUD = "YOUR_CLOUD_NAME";

// auto format (WebP/AVIF), auto quality, cap longest side at 1600px
const TRANSFORMS = "f_auto,q_auto,c_limit,w_1600";

export function resolveImage(ref: string): string {
  if (!ref) return "";
  if (/^https?:\/\//i.test(ref)) return ref; // full URL → as-is
  const id = ref.replace(/^\//, ""); // bare value = Cloudinary public ID
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${TRANSFORMS}/${id}`;
}

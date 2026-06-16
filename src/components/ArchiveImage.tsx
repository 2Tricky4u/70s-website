import { useState } from "react";

interface ArchiveImageProps {
  src: string;
  alt: string;
  className?: string;
  /** deeper ink crush for hero/large surfaces */
  deep?: boolean;
  /** add the multiply ink wash + halftone for printed look */
  printed?: boolean;
}

/**
 * Hybrid image: loads a remote photo with a duotone (orange/ink) filter.
 * If the network fails (offline), it gracefully reveals a procedural
 * CSS-only gritty placeholder so the layout always reads correctly.
 */
export function ArchiveImage({
  src,
  alt,
  className = "",
  deep = false,
  printed = true,
}: ArchiveImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`photo-ink ${className}`}>
      {/* procedural fallback always behind the photo */}
      <div className="photo-fallback absolute inset-0" aria-hidden="true" />

      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            deep ? "duotone-deep" : "duotone"
          } ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* orange multiply wash so remote + fallback share one palette */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,75,11,0.18), rgba(11,11,10,0.05) 40%, rgba(11,11,10,0.55))",
        }}
        aria-hidden="true"
      />

      {printed && (
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

import { useMemo } from "react";

interface BarcodeProps {
  /** seed string so each barcode is stable but unique */
  seed?: string;
  className?: string;
  bars?: number;
  color?: string;
}

/** deterministic pseudo-random barcode from a seed */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Barcode({
  seed = "1990",
  className = "",
  bars = 34,
  color = "#0b0b0a",
}: BarcodeProps) {
  const widths = useMemo(() => {
    const rnd = seeded(seed);
    const raw = Array.from({ length: bars }, () => 0.6 + rnd() * 2.6);
    const sum = raw.reduce((a, b) => a + b, 0);
    return raw.map((w) => (w / sum) * 100);
  }, [seed, bars]);

  let x = 0;
  return (
    <svg
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {widths.map((w, i) => {
        const rect = (
          <rect
            key={i}
            x={x}
            y={0}
            width={i % 2 === 0 ? w : 0}
            height={30}
            fill={color}
          />
        );
        x += w;
        return rect;
      })}
    </svg>
  );
}

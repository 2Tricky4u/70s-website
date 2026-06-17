import type { CSSProperties } from "react";
import { asset } from "./asset";

/** deterministic 0..1 PRNG from a string seed (same as Barcode's) */
export function seeded(seed: string) {
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

/** spatially-varied scratch/dust positions for a .worn-overlay, from a seed */
export function wornVars(seed: string): CSSProperties {
  const r = seeded(seed);
  const pct = () => `${Math.round(r() * 100)}%`;
  return {
    "--scratch-x": pct(),
    "--scratch-y": pct(),
    "--dust-x": pct(),
    "--dust-y": pct(),
    "--fold-x": pct(),
    "--fold-y": pct(),
    "--stain-x": pct(),
    "--stain-y": pct(),
  } as CSSProperties;
}

/** per-title ink-flake mask offset + which distress texture, from a seed */
export function distressVars(seed: string): CSSProperties {
  const r = seeded(seed);
  const off = () => `${Math.round((r() - 0.5) * 520)}px`;
  return {
    "--mask-x": off(),
    "--mask-y": off(),
    "--distress-tex": `url("${asset(`textures/ink-distress-0${r() > 0.5 ? 2 : 1}.webp`)}")`,
  } as CSSProperties;
}

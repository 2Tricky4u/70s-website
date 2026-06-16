import type { CSSProperties } from "react";
import { wornVars } from "../lib/grit";

interface WornLayerProps {
  /** unique seed → unique scratch/dust placement (spatial inconsistency) */
  seed: string;
  /** heavier overlay (folds + stain) for large sections */
  large?: boolean;
  /** dark surfaces: lighten the marks instead of multiplying to black */
  ink?: boolean;
  /** overall mark intensity (0..1) */
  amount?: number;
  className?: string;
}

/**
 * Medium-scale worn overlay (scratches + dust, optionally folds/stain).
 * Drop one into a `relative` section; each instance with a different seed
 * dirties that area differently, so the page never looks like one tiled noise.
 */
export function WornLayer({
  seed,
  large = false,
  ink = false,
  amount,
  className = "",
}: WornLayerProps) {
  const style = wornVars(seed);
  if (amount != null) (style as CSSProperties & Record<string, string>)[
    "--worn-amt"
  ] = String(amount);

  return (
    <div
      aria-hidden="true"
      style={style}
      className={`worn-overlay ${large ? "worn-overlay-lg" : ""} ${
        ink ? "worn-overlay-ink" : ""
      } ${className}`}
    />
  );
}

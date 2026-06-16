import type { CSSProperties, ElementType, ReactNode } from "react";
import { distressVars } from "../lib/grit";

interface DistressedTitleProps {
  children: ReactNode;
  /** rendered tag (h1/h2/h3/span) */
  as?: ElementType;
  /** unique seed → unique ink-flake pattern + offset */
  seed: string;
  className?: string;
  /** text sits on a dark surface → flakes punch ink-coloured holes */
  dark?: boolean;
  /** add SVG edge roughening (use on big display titles only) */
  rough?: boolean;
  /** chromatic print misregistration */
  chroma?: boolean;
  /** flake intensity 0..1 */
  amount?: number;
  style?: CSSProperties;
}

/**
 * Display heading with layered ink wear: a seeded raster ink-flake mask
 * (every title flakes differently) + optional SVG edge roughening + chroma.
 */
export function DistressedTitle({
  children,
  as: Tag = "h2",
  seed,
  className = "",
  dark = false,
  rough = false,
  chroma = false,
  amount,
  style,
}: DistressedTitleProps) {
  const vars: Record<string, string> = {
    ...(distressVars(seed) as Record<string, string>),
    "--distress-bg": dark ? "var(--ink)" : "var(--paper)",
  };
  if (amount != null) vars["--distress-amt"] = String(amount);

  return (
    <Tag
      className={`title-distress ${rough ? "title-rough" : ""} ${
        chroma ? "chroma" : ""
      } ${className}`}
      style={{ ...vars, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

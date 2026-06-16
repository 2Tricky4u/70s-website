import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Cursor-following burnt-orange radial glow + a thin scanline. Desktop only. */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // skip on touch / coarse pointers
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[92]"
      aria-hidden="true"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,75,11,0.22), rgba(255,75,11,0.07) 35%, transparent 70%)",
        }}
        className="absolute h-[420px] w-[420px] rounded-full"
      />
    </motion.div>
  );
}

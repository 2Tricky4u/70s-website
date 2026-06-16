import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";

/**
 * Pointer-reactive 3D tilt + parallax offset for poster cards.
 * Returns motion values to bind to a card and an inner parallax layer.
 */
export function useTilt(max = 9) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 220, damping: 18 });
  const sy = useSpring(py, { stiffness: 220, damping: 18 });

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  // subtle inner parallax (opposite direction, smaller range)
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);
  const shiftX = useTransform(sx, [0, 1], [6, -6]);
  const shiftY = useTransform(sy, [0, 1], [6, -6]);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py]
  );

  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return { rotateX, rotateY, glareX, glareY, shiftX, shiftY, onMove, onLeave };
}

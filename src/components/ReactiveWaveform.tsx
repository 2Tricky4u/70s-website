import { useEffect, useRef } from "react";
import { useMusicPlayer } from "./MusicPlayer";

/**
 * Orange waveform driven by the live audio analyser when playing; falls back
 * to a gentle idle wave when paused. Bars are mutated via refs (no re-render).
 */
export function ReactiveWaveform({
  bars = 24,
  className = "h-7 w-24",
}: {
  bars?: number;
  className?: string;
}) {
  const { getAnalyser, playing } = useMusicPlayer();
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const data = new Uint8Array(64);
    let raf = 0;
    let t = 0;
    const tick = () => {
      const analyser = getAnalyser();
      if (playing && analyser) {
        analyser.getByteFrequencyData(data);
        for (let i = 0; i < bars; i++) {
          const v = data[Math.floor((i / bars) * 48)] / 255;
          const s = 0.12 + v * 1.05;
          const el = refs.current[i];
          if (el) el.style.transform = `scaleY(${Math.min(s, 1)})`;
        }
      } else if (!reduce) {
        t += 0.06;
        for (let i = 0; i < bars; i++) {
          const s = 0.16 + (Math.sin(t + i * 0.55) * 0.5 + 0.5) * 0.22;
          const el = refs.current[i];
          if (el) el.style.transform = `scaleY(${s})`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [getAnalyser, playing, bars]);

  return (
    <div className={`flex items-end gap-px ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="h-full w-[3px] flex-1 origin-bottom bg-orange"
          style={{ transform: "scaleY(0.2)" }}
        />
      ))}
    </div>
  );
}

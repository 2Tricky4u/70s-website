import { motion } from "framer-motion";

/** animated audio waveform built from bars with staggered scaleY loops */
export function Waveform({
  bars = 28,
  className = "h-10",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] flex-1 bg-orange"
          style={{ transformOrigin: "bottom" }}
          animate={{ scaleY: [0.2, 1, 0.45, 0.85, 0.3] }}
          transition={{
            duration: 1.1 + (i % 5) * 0.18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: (i % 7) * 0.07,
          }}
        />
      ))}
    </div>
  );
}

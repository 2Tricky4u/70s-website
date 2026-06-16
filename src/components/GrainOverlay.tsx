/** Full-page animated film grain + scanline overlay, fixed above content. */
export function GrainOverlay() {
  return (
    <>
      <div className="grain-layer animate-grain" aria-hidden="true" />
      {/* faint static scanlines over the whole page */}
      <div
        className="pointer-events-none fixed inset-0 z-[91] opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(11,11,10,0.10) 0px, rgba(11,11,10,0.10) 1px, transparent 1px, transparent 4px)",
          mixBlendMode: "multiply",
        }}
      />
      {/* vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-[89]"
        aria-hidden="true"
        style={{
          boxShadow: "inset 0 0 220px rgba(11,11,10,0.45)",
        }}
      />
    </>
  );
}

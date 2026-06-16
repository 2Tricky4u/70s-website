/**
 * Global SVG filter defs (rendered once) used to rough up printed marks so
 * they read as worn ink rather than clean vector — broken edges, slight
 * wobble, uneven weight. Reference via filter="url(#roughen)" etc.
 */
export function DistressDefs() {
  return (
    <svg
      width="0"
      height="0"
      className="absolute"
      aria-hidden="true"
      style={{ position: "absolute" }}
    >
      <defs>
        {/* very subtle warp — just enough to kill the laser-perfect vector
            edge so the mark sits in the print, not a heavy deformation */}
        <filter id="roughen" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018 0.024"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="roughen-2" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.026"
            numOctaves="2"
            seed="19"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="0.7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* fade mask to break strokes / eat away parts of the ink */}
        <filter id="ink-eat" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="3"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.05"
            result="mask"
          />
          <feComposite in="SourceGraphic" in2="mask" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}

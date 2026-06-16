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
        <filter id="roughen" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05 0.07"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="roughen-2" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.07 0.09"
            numOctaves="2"
            seed="19"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2"
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

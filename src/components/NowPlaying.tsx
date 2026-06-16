import { useMusicPlayer } from "./MusicPlayer";
import { ReactiveWaveform } from "./ReactiveWaveform";

interface NowPlayingProps {
  bars?: number;
  waveClass?: string;
  showMeta?: boolean;
  className?: string;
  /** responsive visibility for the text/controls (player stays visible) */
  titleClass?: string;
  controlsClass?: string;
}

/** Reusable "now playing" cluster wired to the shared MusicPlayer:
 *  play/pause + dynamic track title + reactive waveform + prev/next. */
export function NowPlaying({
  bars = 24,
  waveClass = "h-7 w-24",
  showMeta = false,
  className = "",
  titleClass = "",
  controlsClass = "",
}: NowPlayingProps) {
  const { track, playing, toggle, next, prev } = useMusicPlayer();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="grid h-7 w-7 shrink-0 place-items-center border border-orange text-orange transition hover:bg-orange hover:text-ink"
      >
        {playing ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
            <rect x="2" y="1.5" width="3" height="9" />
            <rect x="7" y="1.5" width="3" height="9" />
          </svg>
        ) : (
          <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
            <path d="M3 1.5 L10 6 L3 10.5 Z" />
          </svg>
        )}
      </button>

      <div
        className={`shrink-0 whitespace-nowrap font-mono text-[9px] uppercase leading-[1.5] tracking-[0.12em] ${titleClass}`}
      >
        <span className="block text-paper/55">NOW PLAYING</span>
        <span className="block text-paper">{track.title}</span>
        {showMeta && <span className="block text-paper/45">{track.meta}</span>}
      </div>

      <ReactiveWaveform bars={bars} className={waveClass} />

      <div
        className={`flex items-center gap-2 font-mono text-[11px] text-paper/55 ${controlsClass}`}
      >
        <button
          onClick={prev}
          aria-label="Previous track"
          className="transition hover:text-orange"
        >
          ◂◂
        </button>
        <button
          onClick={next}
          aria-label="Next track"
          className="transition hover:text-orange"
        >
          ▸▸
        </button>
      </div>
    </div>
  );
}

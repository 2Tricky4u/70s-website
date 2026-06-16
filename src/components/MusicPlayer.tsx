import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TRACKS, type Track } from "../data/tracks";

interface MusicPlayerValue {
  track: Track;
  index: number;
  playing: boolean;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  playIndex: (i: number) => void;
  /** live analyser for the reactive waveform (null until first play) */
  getAnalyser: () => AnalyserNode | null;
}

const Ctx = createContext<MusicPlayerValue | null>(null);

export function useMusicPlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  return v;
}

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const graphReadyRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // build the Web Audio graph once, on first user-initiated play
  const ensureGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || graphReadyRef.current) return;
    const AC: typeof AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AC();
    const source = ctx.createMediaElementSource(audio);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    ctxRef.current = ctx;
    analyserRef.current = analyser;
    graphReadyRef.current = true;
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    ensureGraph();
    void ctxRef.current?.resume();
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [ensureGraph]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else {
      audio.pause();
      setPlaying(false);
    }
  }, [play]);

  const playIndex = useCallback((i: number) => {
    setIndex(((i % TRACKS.length) + TRACKS.length) % TRACKS.length);
    setPlaying(true);
  }, []);

  const next = useCallback(() => playIndex(index + 1), [index, playIndex]);
  const prev = useCallback(() => playIndex(index - 1), [index, playIndex]);

  // when the track index changes, load it and (if we were playing) play it
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[index].src;
    audio.load();
    if (playing) {
      ensureGraph();
      void ctxRef.current?.resume();
      audio.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <Ctx.Provider
      value={{
        track: TRACKS[index],
        index,
        playing,
        toggle,
        next,
        prev,
        playIndex,
        getAnalyser: () => analyserRef.current,
      }}
    >
      <audio
        ref={audioRef}
        src={TRACKS[0].src}
        preload="none"
        crossOrigin="anonymous"
        onEnded={next}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      {children}
    </Ctx.Provider>
  );
}

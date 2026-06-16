import { useState } from "react";
import { Barcode } from "./Barcode";
import { Crosshair } from "./Crosshair";
import { WornLayer } from "./WornLayer";
import { DistressedTitle } from "./DistressedTitle";
import { NowPlaying } from "./NowPlaying";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer
      id="contact"
      className="ink-panel relative overflow-hidden text-paper"
    >
      <div className="scanlines absolute inset-0 opacity-30" aria-hidden="true" />
      <WornLayer seed="footer-sec" ink amount={0.07} />

      {/* top CTA band */}
      <div className="relative z-[2] border-b border-paper/15">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-orange">
              JOIN THE ARCHIVE
            </span>
            <DistressedTitle
              as="h2"
              seed="footer-h2"
              dark
              rough
              className="mt-1 font-display text-4xl uppercase leading-none tracking-tightest sm:text-6xl"
            >
              Submit your memory
            </DistressedTitle>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
            className="flex w-full max-w-md items-stretch border border-paper/40"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR@EMAIL"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper placeholder:text-paper/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-orange px-4 py-3 font-condensed text-xs uppercase tracking-[0.25em] text-ink transition hover:bg-paper"
            >
              {sent ? "FILED ✓" : "SUBMIT →"}
            </button>
          </form>
        </div>
      </div>

      {/* main footer grid */}
      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-condensed text-lg uppercase tracking-[0.2em]">
            <Crosshair className="h-4 w-4 text-orange" />
            NINETEEN <span className="text-orange">NINETY</span>
          </div>
          <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-paper/55">
            ALL PHOTOS © NINETEEN NINETY ARCHIVE.
            <br />
            BUILT IN THE 90S. RUNNING TODAY.
          </p>
          <Barcode seed="footer-brand" color="#e8dfcf" className="h-6 w-32 opacity-80" />
        </div>

        {/* now playing — shared music player */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/55">
            ● ARCHIVE RADIO
          </span>
          <NowPlaying bars={32} waveClass="h-10 w-full" showMeta className="gap-4" />
        </div>

        {/* index */}
        <div className="space-y-2 font-condensed text-sm uppercase tracking-[0.18em] text-paper/70">
          <span className="font-mono text-[10px] tracking-[0.25em] text-paper/45">
            INDEX
          </span>
          {["Archive", "Collections", "Zines", "About", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="nav-scan block w-fit transition hover:text-orange"
            >
              {l}
            </a>
          ))}
        </div>

        {/* coordinates / meta */}
        <div className="space-y-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.15em] text-paper/55">
          <span className="block text-paper/45">SYSTEM STATUS</span>
          <p>40.7128° N · 74.0060° W</p>
          <p>808 STATE · PACIFIC 202</p>
          <p className="text-orange">ARCHIVE ONLINE — REC ●</p>
          <p>NN / 9X / ARC / REV.1999</p>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative border-t border-paper/15">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-2 px-4 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45 sm:flex-row">
          <span>MEMORIES. MOMENTS. MAYHEM.</span>
          <span>NO RIGHTS RESERVED — TAKE WHAT YOU NEED</span>
          <span className="text-orange">EST. 1990</span>
        </div>
      </div>
    </footer>
  );
}

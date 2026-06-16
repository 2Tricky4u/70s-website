import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair } from "./Crosshair";

const LINKS = ["Home", "Archive", "Collections", "Zines", "About", "Contact"];

/** Main horizontal navigation on the paper, sits under the system header. */
export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-40 border-b border-ink/55 bg-paper/40 backdrop-blur-[1px]">
      <div className="mx-auto flex max-w-[1600px] items-stretch justify-between">
        {/* desktop links */}
        <ul className="hidden items-stretch font-condensed text-[13px] font-medium uppercase tracking-[0.2em] md:flex">
          {LINKS.map((link, i) => (
            <Fragment key={link}>
              <li className="flex">
                <a
                  href={`#${link.toLowerCase()}`}
                  data-active={i === 0 ? "true" : "false"}
                  className={`nav-scan group flex items-center px-4 py-2 transition-colors duration-200 lg:px-5 ${
                    i === 0 ? "text-orange" : "text-ink/80 hover:text-orange"
                  }`}
                >
                  <span className="inline-block transition-transform duration-150 group-hover:-translate-y-px group-hover:[text-shadow:1px_0_0_rgba(255,75,11,0.6),-1px_0_0_rgba(59,110,165,0.5)]">
                    {link}
                  </span>
                </a>
              </li>
              {/* full-height divider after HOME — same weight/colour as the rules */}
              {i === 0 && (
                <li aria-hidden="true" className="w-px self-stretch bg-ink/55" />
              )}
            </Fragment>
          ))}
        </ul>

        {/* brand mark on mobile */}
        <span className="flex items-center px-4 py-2 font-display text-lg tracking-tight md:hidden">
          NN<span className="text-orange">.</span>ARCHIVE
        </span>

        {/* right cluster */}
        <div className="flex items-stretch">
          <span className="hidden items-center px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 lg:flex">
            REC ● 1990—1999
          </span>
          <button className="nav-scan group hidden items-center gap-1.5 px-4 font-condensed text-[13px] font-medium uppercase tracking-[0.2em] text-ink/80 transition hover:text-orange md:flex">
            <Crosshair className="h-3.5 w-3.5 text-orange" strokeWidth={1.6} />
            Search
          </button>
          {/* boxed MENU spanning the full nav height (bounded by the rules) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="group flex items-center gap-2.5 self-stretch border-l border-ink/55 px-4 font-condensed text-[13px] font-medium uppercase tracking-[0.2em] text-ink transition hover:bg-ink hover:text-paper lg:px-5"
          >
            Menu
            {/* three-line menu glyph */}
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span
                className={`block h-[2px] w-4 bg-orange transition-transform duration-200 ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 bg-orange transition-transform duration-200 ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* dropdown (mobile + MENU toggle) */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink/30 bg-paper-dark"
          >
            {LINKS.map((link, i) => (
              <li key={link} className="border-b border-ink/15">
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={`block px-5 py-3 font-condensed text-sm uppercase tracking-[0.25em] ${
                    i === 0 ? "text-orange" : "text-ink/85"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

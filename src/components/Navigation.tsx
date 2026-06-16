import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = ["Home", "Archive", "Collections", "Zines", "About", "Contact"];

/** Main horizontal navigation on the paper, sits under the system header. */
export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-40 border-b-2 border-ink/80 bg-paper/40 backdrop-blur-[1px]">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-2.5">
        {/* desktop links */}
        <ul className="hidden items-center gap-6 font-condensed text-[13px] font-medium uppercase tracking-[0.2em] md:flex lg:gap-9">
          {LINKS.map((link, i) => (
            <Fragment key={link}>
              <li>
                <a
                  href={`#${link.toLowerCase()}`}
                  data-active={i === 0 ? "true" : "false"}
                  className={`nav-scan group relative inline-block transition-colors duration-200 ${
                    i === 0
                      ? "text-orange"
                      : "text-ink/80 hover:text-orange"
                  }`}
                >
                  <span className="inline-block transition-transform duration-150 group-hover:-translate-y-px group-hover:[text-shadow:1px_0_0_rgba(255,75,11,0.6),-1px_0_0_rgba(59,110,165,0.5)]">
                    {link}
                  </span>
                </a>
              </li>
              {/* divider line right after HOME, like the reference */}
              {i === 0 && (
                <li
                  aria-hidden="true"
                  className="h-5 w-px self-center bg-ink/35"
                />
              )}
            </Fragment>
          ))}
        </ul>

        {/* brand mark on mobile */}
        <span className="font-display text-lg tracking-tight md:hidden">
          NN<span className="text-orange">.</span>ARCHIVE
        </span>

        {/* right meta + search/menu + hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 lg:inline">
            REC ● 1990—1999
          </span>
          <button className="nav-scan hidden items-center gap-1.5 font-condensed text-[13px] font-medium uppercase tracking-[0.2em] text-ink/80 transition hover:text-orange md:flex">
            <span className="text-orange">✦</span> Search
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="hidden items-center gap-2 border border-ink/70 px-3 py-1.5 font-condensed text-[13px] font-medium uppercase tracking-[0.2em] text-ink transition hover:border-orange hover:text-orange md:flex"
          >
            Menu
            <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-8 w-9 flex-col items-center justify-center gap-[5px] border border-ink/70 transition hover:border-orange md:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-ink transition ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-ink transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-ink transition ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
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

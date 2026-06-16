import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuGlyph } from "./MenuGlyph";
import { NAV_LINKS } from "../data/nav";

/**
 * Compact MENU box that appears once the main nav scrolls out of view and
 * stays fixed top-right, so the menu is always reachable while scrolling.
 */
export function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 180);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible) setOpen(false);
  }, [visible]);

  return (
    <div className="fixed right-3 top-3 z-[95] flex flex-col items-end gap-2 sm:right-5 sm:top-5">
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex cursor-pointer items-center gap-2.5 border border-ink bg-paper px-4 py-2 font-plex text-[12px] font-semibold uppercase tracking-[0.08em] text-ink shadow-[0_6px_22px_rgba(0,0,0,0.5)] transition hover:bg-ink hover:text-paper"
          >
            Menu
            <MenuGlyph open={open} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-44 border border-ink bg-paper shadow-[0_12px_34px_rgba(0,0,0,0.55)]"
          >
            {NAV_LINKS.map((link, i) => (
              <li key={link} className="border-b border-ink/15 last:border-0">
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2.5 font-plex text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    i === 0 ? "text-orange" : "text-ink/85 hover:text-orange"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

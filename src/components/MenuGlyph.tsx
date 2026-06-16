/** three-line menu glyph (inherits currentColor); morphs to an X when open */
export function MenuGlyph({ open = false }: { open?: boolean }) {
  return (
    <span className="flex flex-col gap-[3px]" aria-hidden="true">
      <span
        className={`block h-[2px] w-4 bg-current transition-transform duration-200 ${
          open ? "translate-y-[5px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-4 bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-4 bg-current transition-transform duration-200 ${
          open ? "-translate-y-[5px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

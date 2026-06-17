/**
 * Prefix a local public-asset path with Vite's base URL so it resolves
 * correctly when the site is served from a subpath (e.g. GitHub Pages at
 * /70s-website/). Use for anything under `public/` referenced from JS/TS.
 */
export const asset = (path: string): string =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");

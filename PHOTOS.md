# Adding & hosting photos

Photos are **not** stored in this project. The image files live on an external
host (Cloudinary by default); the website only keeps a small **manifest** that
lists each photo's metadata + a link to its image.

- Archive photos → `src/data/posters.json`
- Collection photos → `src/data/collections.json` (inside each collection's `photos` array)

An `"image"` value can be either:
- a **Cloudinary public ID** — e.g. `"archive/basement-sessions"` (recommended), or
- **any full image URL** — e.g. `"https://res.cloudinary.com/.../photo.jpg"` or a link from any other host. Full URLs are used exactly as written, so you can mix hosts or migrate later with no code changes.

The resolver that expands public IDs lives in `src/lib/imageSrc.ts`.

---

## One-time setup (Cloudinary)

1. Create a free account at <https://cloudinary.com>.
2. On the Dashboard, copy your **Cloud name**.
3. Open `src/lib/imageSrc.ts` and set:
   ```ts
   export const CLOUDINARY_CLOUD = "your-cloud-name";
   ```

Until this is set, entries that use full URLs still work — only bare public IDs need the cloud name.

## Adding a photo

1. Upload the image in the Cloudinary **Media Library** (tip: put archive photos in a folder like `archive/`).
2. Copy its **public ID** (folder + name, no extension), e.g. `archive/basement-sessions`.
3. Add an entry to the right manifest:

   **`src/data/posters.json`** — append an object:
   ```json
   {
     "id": "unique-slug",
     "title": "Two\nLines",
     "subtitle": "SHORT CAPTION",
     "year": 1995,
     "category": "Music",
     "image": "archive/your-public-id",
     "location": "PLACE / DETAIL",
     "coords": "40.7128° N · 74.0060° W",
     "description": "One or two sentences for the expanded view.",
     "archiveId": "NN-013-95",
     "tags": ["tag-a", "tag-b"],
     "accent": "OPTIONAL LABEL"
   }
   ```
   - `id` must be unique. `title` uses `\n` for a line break. `category` must be one of the values in `CATEGORIES` (`src/data/posters.ts`). `accent` is optional.

   **`src/data/collections.json`** — add to a collection's `photos`:
   ```json
   { "id": "col-nightlife-07", "title": "ROLL 02 / FRAME 01", "meta": "SHORT META", "image": "archive/your-public-id" }
   ```
   - The collection's displayed file count updates automatically from the number of photos.

4. Publish: `npm run build` and redeploy.

## Notes

- **Optimization is automatic.** The resolver requests `f_auto,q_auto,c_limit,w_1600`, so Cloudinary serves an optimized WebP/AVIF sized to ≤1600px. To change this globally, edit `TRANSFORMS` in `src/lib/imageSrc.ts`.
- **If an image fails to load**, the card shows a procedural placeholder instead of breaking the layout (handled by `src/components/ArchiveImage.tsx`). Check the public ID / URL.
- The placeholder photos currently in the manifests use `picsum.photos` full URLs — replace them with your own as you go.

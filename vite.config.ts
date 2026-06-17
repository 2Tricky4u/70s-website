import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // served from https://2Tricky4u.github.io/70s-website/ — keep in sync with the repo name
  base: "/70s-website/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});

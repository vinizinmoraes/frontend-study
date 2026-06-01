import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Use relative asset paths for the production build so it works under the
  // GitHub Pages project sub-path (username.github.io/frontend-study/).
  // Dev server stays at the root "/".
  base: command === "build" ? "./" : "/",
  plugins: [react()],
}));

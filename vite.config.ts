import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "FluxGrid",
      fileName: (format) => `flux-grid.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          format: "es",
          entryFileNames: "flux-grid.js",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "flux-grid.cjs",
          dir: "dist",
        },
      ],
    },
  },
});

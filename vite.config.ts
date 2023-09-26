import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: "/src",
      },
    ],
  },
  server: {
    open: true,
    host: true,
    watch: {
      usePolling: true,
    },
    strictPort: true,
    port: 5173,
  },
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("https://jsonplaceholder.typicode.com"),
  },
  css: {
    devSourcemap: true,
  },
});

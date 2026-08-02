import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: "/",
  plugins: [tailwindcss(), react(), svgr()],
  publicDir: "public",
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) {
            return "react-vendor"
          }
          if (id.includes("react-router")) return "router"
          if (id.includes("/axios/")) return "axios"
          if (id.includes("react-icons")) return "icons"
          if (id.includes("/swiper/")) return "swiper"
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{js,jsx}"],
    setupFiles: ["src/test/setup.js"],
  },
})

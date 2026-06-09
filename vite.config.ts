import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const hasSegment = (segment: string) =>
            id.includes(`/${segment}/`) || id.includes(`\\${segment}\\`);

          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("react-dom") || hasSegment("react")) {
            return "react-vendor";
          }

          if (
            id.includes("react-router") ||
            id.includes("react-router-dom")
          ) {
            return "router-vendor";
          }

          if (
            id.includes("@tanstack/react-query") ||
            hasSegment("axios")
          ) {
            return "data-vendor";
          }

          if (id.includes("react-helmet-async")) {
            return "seo-vendor";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("lucide-react") ||
            hasSegment("sonner")
          ) {
            return "ui-vendor";
          }

          if (
            hasSegment("gsap") ||
            hasSegment("motion") ||
            id.includes("framer-motion")
          ) {
            return "animation-vendor";
          }

          if (id.includes("@mui")) {
            return "mui-vendor";
          }
        },
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react';
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('styled-components')) return 'styled';
            if (id.includes('@tanstack/react-query')) return 'react-query';
            if (id.includes('react-router')) return 'router';
          }
        }
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
function componentTagger() {
  return {
    name: 'component-tagger',
    transform(code: string, id: string) {
      // Only process JSX/TSX files
      if (!id.endsWith('.jsx') && !id.endsWith('.tsx')) {
        return null;
      }

      // Simple regex to find React component declarations
      const componentMatch = code.match(/function\s+([A-Z]\w+)|const\s+([A-Z]\w+)\s*=/g);
      if (!componentMatch) {
        return null;
      }

      // Add data-component attribute to the component's JSX
      let modifiedCode = code.replace(
        /(<[A-Z]\w+)(\s|>)/g,
        '$1 data-component="$1"$2'
      );

      return {
        code: modifiedCode,
        map: null
      };
    }
  };
}

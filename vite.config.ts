import { defineConfig } from 'vite'

export default defineConfig({
  // Vercel serves the site from the domain root; GitHub Pages serves it from
  // a /myportfolio1/ subpath. Vercel sets the VERCEL env var during builds,
  // so this keeps both deployments working without manual toggling.
  base: process.env.VERCEL ? '/' : '/myportfolio1/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  },
  assetsInclude: ['**/*.svg', '**/*.jpg', '**/*.png', '**/*.webp', '**/*.avif']
})
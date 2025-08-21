import { defineConfig } from 'vite'

export default defineConfig({
  base: '/webpage/',
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
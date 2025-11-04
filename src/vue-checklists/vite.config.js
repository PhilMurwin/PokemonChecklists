import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Use a relative base so the built assets use relative paths. This
  // makes the build portable when the site is served from a nested IIS
  // path (we can still override with the --base CLI flag if needed).
  base: './',
  build: {
    // Output directly into the PKMNPostGame.Web folder so the built files
    // become part of the existing static site and can be committed/deployed
    outDir: '../PKMNPostGame.Web/vue-checklists',
    assetsDir: 'assets'
  }
})

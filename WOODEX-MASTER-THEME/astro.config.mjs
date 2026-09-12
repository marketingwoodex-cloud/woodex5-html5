// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Woodex Master Theme — Astro configuration
 *
 * ─ Design goals ─────────────────────────────────────────────────────────
 * 1. Static output  → drops onto ANY shared host (Hostinger, cPanel, Netlify)
 * 2. Zero runtime framework → only Astro islands where genuinely needed
 * 3. Relative asset URLs → the built `dist/` folder can sit in a subfolder
 * 4. Permissive dev host → renders inside sandbox / preview iframes
 */
export default defineConfig({
  site: 'https://woodexinterior.com',

  // Pure static build. No SSR adapter required.
  output: 'static',
  build: {
    // Emit /about/index.html rather than /about.html — cleaner URLs,
    // works on Apache + Nginx + Netlify without extra rewrite rules.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  // Emit *relative* links so the theme works from a subdirectory too.
  trailingSlash: 'ignore',
  compressHTML: true,

  server: {
    host: '0.0.0.0',
    port: 4321,
    /**
     * Accept any hostname. This is what lets the theme render inside the
     * Arena / sandbox preview iframe (which arrives on a *.e2b.app host)
     * and in Codespaces / Gitpod / ngrok tunnels without a 403.
     *
     * On a locked-down production box, replace `true` with an explicit list:
     *   allowedHosts: ['woodexinterior.com', 'www.woodexinterior.com']
     */
    allowedHosts: true,
  },

  // Vite needs the same permission for its own dev-server guard.
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      cors: true,
    },
    preview: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
  },
});

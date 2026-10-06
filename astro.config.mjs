import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://enzomazzariol.com',
  // URLs without trailing slash everywhere: sitemap, canonical (BaseHead) and Vercel redirects agree
  trailingSlash: 'never',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});

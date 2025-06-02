// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    server: {
        allowedHosts: [
          'vulture-keen-magpie.ngrok-free.app',
          'saved-salmon-big.ngrok-free.app',
          'singular-terrier-ideally.ngrok-free.app',
          "inviting-mostly-badger.ngrok-free.app",
          'finer-clever-aphid.ngrok-free.app',
          'f13d-2a09-bac5-461f-1e14-00-2ff-6d.ngrok-free.app'
        ]
    },
    output: 'static', 
    site: 'https://expo2025.kamiyama.ac.jp', // サイトのURL
});

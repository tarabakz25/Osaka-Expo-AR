// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    server: {
        allowedHosts: [
          'vulture-keen-magpie.ngrok-free.app',
          'saved-salmon-big.ngrok-free.app',
          'singular-terrier-ideally.ngrok-free.app',
          "inviting-mostly-badger.ngrok-free.app",
          'finer-clever-aphid.ngrok-free.app'
        ]
    },
    output: 'static', 
    site: 'https://expo2025.kamiyama.ac.jp', // サイトのURL
});

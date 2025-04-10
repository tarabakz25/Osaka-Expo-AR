// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // Nodeアダプターをインポート

// https://astro.build/config
export default defineConfig({
    server: {
        allowedHosts: [
          'vulture-keen-magpie.ngrok-free.app',
          'saved-salmon-big.ngrok-free.app',
          'singular-terrier-ideally.ngrok-free.app',
          "inviting-mostly-badger.ngrok-free.app"
        ]
    }
});

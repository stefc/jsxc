import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from 'vite';

import mkcert from 'vite-plugin-mkcert'

const overrideDefineConfig = ({mode}) => {

   // Load app-level env vars to node-level env vars.
  const env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig(
    {
      base: './',
      plugins: [mkcert()],
      define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
        APP_TITLE: JSON.stringify(process.env.npm_package_description),
        APP_AUTHOR: JSON.stringify(process.env.npm_package_author_name),
        APP_URL: JSON.stringify(process.env.npm_package_author_url),
        APP_ENVIRONMENT: JSON.stringify(mode)
      },
      server: {
        port: 3001,
        open: '/',
        https: true,
      },
      resolve: {
        alias: [
          { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
          { find: '@util', replacement: fileURLToPath(new URL('./src/util', import.meta.url)) },
          { find: '@src', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
          { find: '@ui', replacement: fileURLToPath(new URL('./src/ui', import.meta.url)) },
          { find: '@connection', replacement: fileURLToPath(new URL('./src/connection', import.meta.url)) },
          { find: '@vendor', replacement: fileURLToPath(new URL('./src/vendor', import.meta.url)) },
        ],
      },
      build: {
        // Relative to the root
        outDir: './dist',
        sourcemap: false,
        rollupOptions: {
          external: [
            'js/jquery.min.js',
            '/libsignal/dist/libsignal-protocol.js',
            'js/example.js',
            'js/helper.js'
          ]
        }
      },
      publicDir: './public',
    });
  }

  export default overrideDefineConfig

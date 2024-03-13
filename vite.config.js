import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/firebase-auth/',
  plugins: [react(), vercel()],
  server: {
    host: true
  }
});

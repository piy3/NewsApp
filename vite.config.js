import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Allow access from external devices
    port: 5173,       // Ensure this matches your running port
    strictPort: true,
    allowedHosts: ['.ngrok-free.app'] // Allow ngrok URLs
  }
});

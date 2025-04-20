import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      'da52-2409-40f4-200b-70bb-f051-9524-98d7-43e8.ngrok-free.app'
    ],
    host: '0.0.0.0', // Ensure Vite listens on all network interfaces
    port: 5173, // Set the port (match your local server's port)
    strictPort: true // Ensures Vite uses this port only
  }
})

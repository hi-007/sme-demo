import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/', // ตั้งค่าให้ตรงกับ repository name
  build: {
    chunkSizeWarningLimit: 1000
  }
});

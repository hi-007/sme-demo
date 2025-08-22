import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   //base: '/sme-project/client/dist/assets',  // ตั้งค่า base path ให้ตรงกับ repository และโฟลเดอร์
//   build: {
//     chunkSizeWarningLimit: 1000,  // ตั้งขนาด chunk ให้มากกว่า 500 KB เช่น 1000 KB หรือ 1 MB
//   }
// })

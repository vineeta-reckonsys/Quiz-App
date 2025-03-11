import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),

  ],
  resolve:{
    alias:{
            '~bootstrap': path.resolve('node_modules/bootstrap'),
           
        }
      }
})


// export default {
//   root: path.resolve(__dirname, 'src'),
//   server: {
//     hot: true
//   }
// }
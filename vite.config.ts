import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';
// https://github.com/moviedomfo/personsfront.git
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: 'https://moviedomfo.github.com.io/personsfront',
  base: '/personsfront/',

  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})

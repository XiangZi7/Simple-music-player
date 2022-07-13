import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const resolve = (dir: string) => path.join(__dirname, dir)
export default defineConfig({
  base: './', // 添加这个属性
  resolve: {
    alias: {
      '@': resolve('src'),
      'coms': resolve('src/layout/components'),
      'appin': resolve('src/layout/components/AppMain'),
      'apis': resolve('src/apis'),
      'views': resolve('src/views'),
      'utils': resolve('src/utils'),
      'routes': resolve('src/routes'),
      'styles': resolve('src/styles')
    }
  },
  plugins: [
    vue(),
    AutoImport({
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]


})

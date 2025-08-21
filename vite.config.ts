import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

import viteImagemin from 'vite-plugin-imagemin' // 图片压缩


export default defineConfig({
    plugins: [
        react(),
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false
            },
            optipng: {
                optimizationLevel: 7
            },
            mozjpeg: {
                quality: 30 // 增加质量以提高图片质量
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4
            },
            svgo: {
                plugins: [
                    {
                        name: 'removeViewBox'
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false
                    },
                    {
                        name: 'removeComments' // 移除 SVG 文件中的注释
                    },
                    {
                        name: 'removeUselessDefs' // 移除无用的 <defs>
                    },
                    {
                        name: 'cleanupIDs' // 清理未使用的 ID
                    }
                ]
            }
        })
    ],

    build: {
        target: 'esnext',
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            treeshake: true,    // 摇掉无用代码


            output: {
                entryFileNames: `assets/[name].[hash].js`,
                chunkFileNames: `assets/[name].[hash].js`,
                assetFileNames: `assets/[name].[hash].[ext]`,
            },
        },
    },


})

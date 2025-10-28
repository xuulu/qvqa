import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'export',   // 静态导出

    productionBrowserSourceMaps: false,  // 关闭生产环境sourceMap

    experimental: {
        optimizePackageImports: [
            'antd',
            '@ant-design/icons',
        ]
    },

    images: {
        formats: ['image/avif', 'image/webp'],  // 支持avif和webp格式
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // 适配不同设备
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],    // 图片尺寸
    },


};

export default nextConfig;

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




};

export default nextConfig;

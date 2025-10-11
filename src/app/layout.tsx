import type {Metadata, Viewport} from "next";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider"
import {BackgroundProvider} from "@/hooks/useGlobalBackground"

export const metadata: Metadata = {
    title: "简心运维",
    description: "这是简心运维官方网站",
    icons: [
        {
            url: "/favicon.ico",
            type: "image/x-icon",
            sizes: "64x64"
        },
        {
            url: "/favicon.png",
            type: "image/png",
            sizes: "1024x1024"
        },
        {
            url: "/logo.png",
            type: "image/png",
            sizes: "248x248"
        }
    ],
};

export const viewport: Viewport = {
    width: "device-width",  // 宽度
    height: "device-height", // 高度
    initialScale: 1,    // 缩放比例
    maximumScale: 1,    // 最大缩放比例
    userScalable: false, // 是否允许用户缩放
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
        <body style={{
            background: "linear-gradient(-225deg, rgb(112, 133, 182) 0%, rgb(135, 167, 217) 48%, rgb(222, 243, 248) 100%)"
        }}>
        <AntdRegistry>
            <ThemeProvider>
                <BackgroundProvider>
                    {children}
                </BackgroundProvider>
            </ThemeProvider>
        </AntdRegistry>
        </body>
        </html>
    );
}

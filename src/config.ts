// 站点配置
export interface SiteConfig {
    title: string;
    menus: MenuItem[];
    images: ImageConfig;
    css: CssConfig;
}

// 菜单项配置
export interface MenuItem {
    title: string;
    url: string;
}

// 图片配置
export interface ImageConfig {
    mobile: string[];
    pc: string[];
}

// CSS配置
export interface CssConfig {
    text: TextStyle;
}

// 文本样式配置
export interface TextStyle {
    color: string;
}

const config: SiteConfig = {
    title: '简心运维',
    menus: [
        {
            title: '首页',
            url: '/',
        },
        {
            title: '简心API',
            url: 'https://api.qvqa.cn',
        },
        {
            title: 'Json解析',
            url: 'https://json.qvqa.cn',
        }
    ],
    images: {
        mobile: [
            '/images/mobile/1.jpg',
            '/images/mobile/2.jpg',
            '/images/mobile/3.jpg',
            '/images/mobile/4.jpg',
            '/images/mobile/5.jpg',
            '/images/mobile/6.jpg',
            '/images/mobile/7.jpg',
        ],
        pc: [
            '/images/pc/1.jpg',
            '/images/pc/2.jpg',
            '/images/pc/3.jpg',
            '/images/pc/4.webp',
            '/images/pc/5.webp',
            '/images/pc/6.webp',
        ],
    },
    css: {
        text: {
            color: '#6ce19c',
        }
    }
};

export default config;
"use client"
import React, {useState, useMemo, createContext, useContext} from 'react';
import {ConfigProvider} from 'antd';
import type {ThemeConfig} from 'antd';

// 自定义两个主题示例：light 和 dark（可按需扩展）
const makeTheme = (mode: 'light' | 'dark', primary = '#1677ff'): ThemeConfig => {
    if (mode === 'light') {
        return {
            algorithm: undefined,
            token: {
                colorPrimary: primary,
                // 容器背景
                colorBgContainer: 'rgba(255,255,255,0.1)',
                // 容器边框
                colorBorder: 'rgba(255,255,255,0.5)',
                // 容器阴影 包括：菜单、抽屉、模态框、卡片、表格等
                colorBgElevated: 'rgba(255,255,255,0.5)',
                // colorBgSpotlight: 'rgba(255,255,255,0.01)',
                // colorFillSecondary: 'rgba(255,255,255,0.03)',
                // colorFillTertiary: 'rgba(255,255,255,0.03)',
                // colorFillQuaternary: 'rgba(255,255,255,0.03)',
                // colorPrimaryBg: 'rgba(255,255,255,0.8)',

                // 其他 token 可按需覆盖...
            },
            components: {
                // 配置组件的样式
                Select: {
                    controlHeight: 40,
                },
                Input: {
                    controlHeight: 40,
                },

            },
        };
    }

    return {
        algorithm: undefined,
        token: {
            colorPrimary: primary,
            colorBgContainer: 'rgba(18,18,20,0.36)', // 深色 glass
            colorBgElevated: 'rgba(255,255,255,0.02)',
            // 例如把文本颜色也调整（可选）
            colorText: '#e6e6e6',
        },
    };
};

// 创建 Context
export const ThemeContext = createContext({
    mode: 'light' as 'light' | 'dark',
    setMode: (mode: 'light' | 'dark') => {
    },
    primary: '#1677ff',
    setPrimary: (color: string) => {
    }
});

// 创建自定义 hook 便于使用
export const useTheme = () => useContext(ThemeContext);

// 在 ThemeProvider 中使用
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [primary, setPrimary] = useState('#1677ff');

    const theme = useMemo(() => makeTheme(mode, primary), [mode, primary]);

    const contextValue = {
        mode,
        setMode,
        primary,
        setPrimary
    };

    return (
        <ThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={theme}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
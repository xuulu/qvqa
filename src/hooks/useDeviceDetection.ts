'use client'
import {useState, useEffect} from 'react';

/**
 * 设备信息接口定义
 * 包含设备类型判断和屏幕尺寸信息
 */
interface DeviceInfo {
    /**
     * 是否为移动设备
     */
    isMobile: boolean;

    /**
     * 是否为平板设备
     */
    isTablet: boolean;

    /**
     * 是否为桌面设备
     */
    isDesktop: boolean;

    /**
     * 设备类型枚举
     */
    deviceType: 'mobile' | 'tablet' | 'desktop';

    /**
     * 屏幕宽度（像素）
     */
    screenWidth: number;

    /**
     * 屏幕高度（像素）
     */
    screenHeight: number;
}

/**
 * 自定义Hook：用于检测当前设备类型和屏幕尺寸
 *
 * @returns DeviceInfo - 包含设备类型和屏幕信息的对象
 *
 * @example
 * const { isMobile, deviceType, screenWidth } = useDeviceDetection();
 * if (isMobile) {
 *   // 移动端特定逻辑
 * }
 */
const useDeviceDetection = (): DeviceInfo => {
    // 设备信息状态
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        deviceType: 'desktop',
        screenWidth: 0,
        screenHeight: 0
    });

    // 副作用：监听窗口尺寸变化
    useEffect(() => {
        /**
         * 处理窗口尺寸变化的回调函数
         * 根据当前窗口宽度判断设备类型并更新状态
         */
        const handleResize = () => {
            const width = window.innerWidth;
            let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
            let isMobile = false;
            let isTablet = false;
            let isDesktop = false;

            // 根据常见的断点来判断设备类型
            // 移动设备断点：屏幕宽度 <= 768px
            if (width <= 768) {
                deviceType = 'mobile';
                isMobile = true;
            }
            // 平板设备断点：屏幕宽度 <= 1024px
            else if (width <= 1024) {
                deviceType = 'tablet';
                isTablet = true;
            }
            // 桌面设备：屏幕宽度 > 1024px
            else {
                deviceType = 'desktop';
                isDesktop = true;
            }

            // 更新设备信息状态
            setDeviceInfo({
                isMobile,
                isTablet,
                isDesktop,
                deviceType,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight
            });
        };

        // 初始化设备检测
        handleResize();

        // 添加窗口尺寸变化事件监听器
        window.addEventListener('resize', handleResize);

        // 清理函数：组件卸载时移除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 空依赖数组表示仅在组件挂载时执行一次

    return deviceInfo;
};

export default useDeviceDetection;

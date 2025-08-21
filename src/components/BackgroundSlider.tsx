import React, { useEffect, useRef } from 'react';

// 声明微信JSBridge的全局类型
declare global {
    interface Window {
        WeixinJSBridge: any;
    }
}

const BackgroundSlider: React.FC = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasUnmutedRef = useRef(false);

    // 视频背景组件
    const VideoBackground = () => {
        return (
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover',
                    // objectFit: 'contain',
                    zIndex: -1,
                    pointerEvents: 'none'
                }}
                // 添加微信浏览器兼容属性
                x5-video-player-type="h5"
                x5-video-player-fullscreen="true"
                x5-video-orientation="portraint"
            >
                <source
                    src={isMobile ? "/videos/mobile/丝柯克.mp4" : "/videos/pc/丝柯克.mp4"}
                    type="video/mp4"
                />
            </video>
        );
    };

    // 处理微信浏览器兼容性
    const handleWechatCompatibility = () => {
        // 检查是否在微信浏览器中
        const isWechat = /MicroMessenger/i.test(navigator.userAgent);
        
        if (isWechat) {
            // 添加微信JSBridge支持
            if (typeof window.WeixinJSBridge === "object" && typeof window.WeixinJSBridge.invoke === "function") {
                window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
                    console.log('WeixinJSBridge initialized');
                });
            } else {
                document.addEventListener("WeixinJSBridgeReady", () => {
                    window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
                        console.log('WeixinJSBridge ready');
                    });
                }, false);
            }
        }
    };

    // 用户交互处理 - 取消视频静音
    const handleUserInteraction = () => {
        // 如果视频元素存在且尚未取消静音
        if (videoRef.current && !hasUnmutedRef.current) {
            // 先取消静音
            videoRef.current.muted = false;
            
            // 尝试播放以确保音频可以播放
            const playPromise = videoRef.current.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // 视频播放成功
                        hasUnmutedRef.current = true;
                        console.log('视频音频播放成功');
                    })
                    .catch((error) => {
                        // 自动播放失败，恢复静音状态
                        console.log('视频音频播放失败，恢复静音状态:', error);
                        videoRef.current!.muted = true;
                    });
            } else {
                // play() 方法没有返回Promise，但也可能播放成功
                hasUnmutedRef.current = true;
                console.log('视频音频可能播放成功');
            }
        }
        
        // 保留事件监听器，但添加检查避免重复处理
        if (hasUnmutedRef.current) {
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
        }
    };

    useEffect(() => {
        // 处理微信浏览器兼容性
        handleWechatCompatibility();
        
        // 添加用户交互事件监听器
        document.addEventListener('touchstart', handleUserInteraction);
        document.addEventListener('click', handleUserInteraction);

        // 清理函数
        return () => {
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    return <VideoBackground/>;
};

export default BackgroundSlider;
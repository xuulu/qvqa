"use client"
// 引入React核心API及所需Hooks
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    useCallback,
} from 'react';

// 定义背景类型枚举：图片或视频
type BgType = 'image' | 'video';

// 定义背景状态接口
interface BgState {
    type: BgType;           // 背景类型(image/video)
    src: string;            // 媒体资源地址
    poster?: string;        // 视频封面图(可选)
    overlay?: string;       // 遮罩层样式(可选)
    transition?: number;    // 切换过渡时间(ms)(可选)
    autoplay?: boolean;     // 是否自动播放(视频)(可选)
    loop?: boolean;         // 是否循环播放(视频)(可选)
    muted?: boolean;        // 是否静音(视频)(可选)
}

// 定义背景上下文数据结构
interface BgContextType {
    state: BgState;                             // 当前背景状态
    setBackground: (newState: Partial<BgState>) => void; // 设置新背景的方法
    resetBackground: () => void;                // 重置背景到默认值的方法
}

// 默认背景配置
const defaultState: BgState = {
    type: 'image',
    src: '',
    overlay: '',
    transition: 600,
    autoplay: true,
    loop: true,
    muted: false,
};

// 创建背景上下文对象
const BgContext = createContext<BgContextType | null>(null);

// 提供者组件 - 包装应用并管理全局背景
export function BackgroundProvider({
                                       children,
                                       persist = true, // 是否持久化存储到localStorage
                                   }: {
    children: React.ReactNode;
    persist?: boolean;
}) {
    // 添加客户端挂载状态
    const [mounted, setMounted] = useState(false);
    // 初始化状态 - 支持从localStorage恢复上次设置
    const [state, setState] = useState<BgState>(() => {
        // 仅在客户端且需要持久化时才读取 localStorage
        if (typeof window !== 'undefined' && persist) {
            try {
                const saved = localStorage.getItem('globalBackground_last');
                if (saved) return {...defaultState, ...JSON.parse(saved)};
            } catch {
            }
        }
        return defaultState;
    });

    useEffect(() => {
        setMounted(true);
        // 如果有背景源则显示
        if (state.src) {
            setVisible(true);
        }
    }, []);

    // 控制媒体显示/隐藏动画
    const [visible, setVisible] = useState(false);

    // 视频DOM引用
    const videoRef = useRef<HTMLVideoElement>(null);

    // 更新背景状态 - 带淡入淡出效果
    const setBackground = useCallback(
        (newState: Partial<BgState>) => {
            setVisible(false); // 先隐藏当前背景
            setTimeout(() => {
                setState((prev) => ({...prev, ...newState})); // 更新状态
                setVisible(true); // 显示新的背景
            }, state.transition || 600); // 使用指定或默认过渡时间
        },
        [state.transition]
    );

    // 重置背景为默认配置
    const resetBackground = useCallback(() => {
        setState(defaultState);
    }, []);

    // 处理视频自动播放兼容性问题
    useEffect(() => {
        if (state.type === 'video' && videoRef.current && state.autoplay) {
            const v = videoRef.current;
            const p = v.play(); // 尝试播放

            // 如果播放被阻止，则尝试静音后再次播放
            if (p && typeof p.then === 'function') {
                p.catch(() => {
                    v.muted = true;
                    v.play().catch(() => {
                    });
                });
            }
        }
    }, [state]);

    // 持久化保存背景设置到localStorage
    useEffect(() => {
        if (persist && state.src) {
            try {
                localStorage.setItem('globalBackground_last', JSON.stringify(state));
            } catch {
            }
        }
    }, [state, persist]);

    // 容器基础样式
    const containerStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
        transition: `opacity ${state.transition}ms ease`,
        opacity: visible ? 1 : 0, // 根据visible控制透明度实现淡入淡出
    };

    // 媒体元素样式（居中裁剪填充）
    const mediaStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        minWidth: '100%',
        minHeight: '100%',
        width: 'auto',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover',
        pointerEvents: 'none',
        userSelect: 'none',
    };

    // 遮罩层样式
    const overlayStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        background: state.overlay || 'transparent',
        pointerEvents: 'none',
        transition: `background ${state.transition}ms ease`,
    };

    return (
        <BgContext.Provider value={{state, setBackground, resetBackground}}>
            {children}
            {/* 只在客户端且已挂载时渲染背景 */}
            {mounted && (
                <div style={containerStyle}>
                    {/* 图片背景 */}
                    {state.type === 'image' && state.src && (
                        <img src={state.src} alt="" style={mediaStyle} draggable={false}/>
                    )}

                    {/* 视频背景 */}
                    {state.type === 'video' && state.src && (
                        <video
                            ref={videoRef}
                            src={state.src}
                            poster={state.poster}
                            muted={state.muted}
                            loop={state.loop}
                            playsInline
                            autoPlay={state.autoplay}
                            preload="auto"
                            style={mediaStyle}
                        />
                    )}

                    {/* 叠加遮罩层 */}
                    {state.overlay && <div style={overlayStyle}></div>}
                </div>
            )}
        </BgContext.Provider>
    );
}

// 自定义Hook - 方便子组件访问背景上下文
export function useGlobalBackground() {
    const ctx = useContext(BgContext);
    if (!ctx) {
        throw new Error('useGlobalBackground() 必须在 <BackgroundProvider> 内使用');
    }
    return ctx;
}

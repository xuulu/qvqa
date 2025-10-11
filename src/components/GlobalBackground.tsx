import React, { useState, useEffect, useRef } from 'react';

/**
 * 高级背景组件（支持图片、视频、渐变、overlay）
 * props:
 *  - type: 'image' | 'video'
 *  - src: 背景资源 URL
 *  - poster: 视频封面（可选）
 *  - overlay: 遮罩层颜色（rgba、渐变均可）
 *  - transition: 淡入淡出时长（毫秒）
 *  - autoplay, loop, muted: 视频控制参数
 *  - persist: 是否启用持久化存储（默认 true）
 */
export default function GlobalBackground({
  type = 'image',
  src = '',
  poster = '',
  overlay = '',
  transition = 600,
  autoplay = true,
  loop = true,
  muted = false,
  persist = true
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentType, setCurrentType] = useState(type);
  const [visible, setVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 初始化时从 localStorage 恢复上次的背景设置
  useEffect(() => {
    if (persist) {
      try {
        const savedData = localStorage.getItem('globalBackground_last');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed.src) {
            setCurrentSrc(parsed.src);
            setCurrentType(parsed.type || 'image');
          }
        }
      } catch (e) {
        console.warn('无法从 localStorage 恢复网站背景');
      }
    } else {
      setCurrentSrc(src);
      setCurrentType(type);
    }
  }, [persist]);

  console.log('检查状态', src);

  // 平滑切换资源
  useEffect(() => {
    if (src === currentSrc) return;
    setVisible(false); // 淡出
    const t = setTimeout(() => {
      setCurrentSrc(src);
      setCurrentType(type);
      setVisible(true); // 淡入
    }, transition);
    return () => clearTimeout(t);
  }, [src]);

  // 持久化存储最新的背景资源
  useEffect(() => {
    if (persist && currentSrc) {
      try {
        const dataToSave = {
          src: currentSrc,
          type: currentType,
          timestamp: Date.now()
        };
        localStorage.setItem('globalBackground_last', JSON.stringify(dataToSave));
      } catch (e) {
        console.warn('无法将背景状态保存到 localStorage');
      }
    }
  }, [currentSrc, currentType, persist]);

  // 视频自动播放兼容（移动端）
  useEffect(() => {
    if (currentType === 'video' && autoplay && videoRef.current) {
      const v = videoRef.current;
      const p = v.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    }
  }, [currentType, currentSrc, autoplay]);

  // 主容器样式
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: -1,
    pointerEvents: 'none',
    transition: `opacity ${transition}ms ease`,
    opacity: visible ? 1 : 0,
  };

  // overlay（可选）
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    background: overlay || 'transparent',
    pointerEvents: 'none',
    transition: `background ${transition}ms ease`,
  };

  // 图片/视频样式
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
    transition: `opacity ${transition}ms ease`,
  };

  return (
    <div style={containerStyle}>
      {currentType === 'image' && currentSrc && (
        <img src={currentSrc} alt="" style={mediaStyle} draggable={false} />
      )}

      {currentType === 'video' && currentSrc && (
        <video
          ref={videoRef}
          src={currentSrc}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline
          autoPlay={autoplay}
          preload="auto"
          style={mediaStyle}
        />
      )}

      {overlay && <div style={overlayStyle}></div>}
    </div>
  );
}

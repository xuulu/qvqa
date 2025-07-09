import React from 'react';
// import config from '../config';

const BackgroundSlider: React.FC = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // const mobileImages = config.images.mobile;
    // const pcImages = config.images.pc;

    // 视频背景组件
    const VideoBackground = () => {
        return (
            <video
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
            >
                <source
                    src={isMobile ? "/videos/mobile/丝柯克.mp4" : "/videos/pc/丝柯克.mp4"}
                    type="video/mp4"
                />
            </video>
        );
    };

    // 图片背景逻辑组件
    // const ImageBackground = () => {
    //     useEffect(() => {
    //         // 图片预加载
    //         const preloadImages = (sources: string[]) => {
    //             sources.forEach(src => {
    //                 const img = new Image();
    //                 img.src = src;
    //                 img.onload = () => console.log(`Preloaded image: ${src}`);
    //                 img.onerror = e => console.error(`Failed to load image: ${src}`, e);
    //             });
    //         };
    //
    //         const imagePath = isMobile
    //             ? mobileImages[Math.floor(Math.random() * mobileImages.length)]
    //             : pcImages[Math.floor(Math.random() * pcImages.length)];
    //
    //         document.body.style.backgroundSize = 'cover';
    //         document.body.style.backgroundPosition = 'center';
    //         document.body.style.backgroundRepeat = 'no-repeat';
    //         document.body.style.minHeight = '100vh';
    //         document.body.style.overflowX = 'hidden';
    //         document.body.style.textShadow = '0.05rem 0.1rem rgb(215, 60, 227)';
    //         document.body.style.boxShadow = 'inset 0 0 5rem rgb(218, 237, 246)';
    //         document.body.style.transition = 'background-image 1s ease-in-out';
    //         document.body.style.backgroundImage = `url(${imagePath})`;
    //
    //         preloadImages(isMobile ? mobileImages : pcImages);
    //
    //         const timerId = setInterval(() => {
    //             const newPath = isMobile
    //                 ? mobileImages[Math.floor(Math.random() * mobileImages.length)]
    //                 : pcImages[Math.floor(Math.random() * pcImages.length)];
    //             document.body.style.backgroundImage = `url(${newPath})`;
    //         }, 3000);
    //
    //         return () => clearInterval(timerId);
    //     }, []);
    //
    //     return null;
    // };


    return <VideoBackground/>;


};

export default BackgroundSlider;

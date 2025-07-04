import React, {useEffect} from 'react';
import config from '../config';




const BackgroundSlider: React.FC = () => {

    useEffect(() => {
        // 设置 body 样式
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.minHeight = '100vh';
        document.body.style.overflowX = 'hidden';
        document.body.style.textShadow = '0.05rem 0.1rem rgb(215, 60, 227)';
        document.body.style.boxShadow = 'inset 0 0 5rem rgb(218, 237, 246)';
        document.body.style.transition = 'background-image 1s ease-in-out'; // 过渡效果


        const changeBackground = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            const mobile = config.images.mobile
            const pc = config.images.pc


            const imagePath = isMobile
                ?
                mobile[Math.floor(Math.random() * mobile.length)]
                :
                pc[Math.floor(Math.random() * pc.length)]

            document.body.style.backgroundImage = `url(${imagePath})`;
        };

        changeBackground(); // 初始设置

        // 设置定时器，每秒执行一次
        const timerId = setInterval(() => {

            changeBackground(); // 循环更新背景图片
        }, 3000);

        // 返回清理函数
        return () => {
            clearInterval(timerId); // 组件卸载时清除定时器
        };


    }, []);

    return null; // 不渲染任何 UI，只用于控制 body
};

export default BackgroundSlider;

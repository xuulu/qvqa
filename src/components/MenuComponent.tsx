"use client"
import React, {useEffect, useState} from 'react';
import {Modal, Tabs, Radio} from 'antd';
import type {TabsProps} from 'antd';
import useDeviceDetection from "@/hooks/useDeviceDetection";
import {useGlobalBackground} from "@/hooks/useGlobalBackground";

const {Group} = Radio;

const MenuComponent: React.FC = () => {
    const [time, setTime] = useState<string>('');
    const {isMobile} = useDeviceDetection();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setBackground, resetBackground} = useGlobalBackground();

    useEffect(() => {
        let frameId: number;

        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
            frameId = requestAnimationFrame(updateTime);
        };

        frameId = requestAnimationFrame(updateTime);

        return () => cancelAnimationFrame(frameId);
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '背景切换',
            children: (
                <Group
                    style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}
                    onChange={(e) => {
                        const value = e.target.value
                        // 判断后缀为.jpg 或 .MP4
                        if (
                            value.endsWith('.jpg') ||
                            value.endsWith('.webp') ||
                            value.endsWith('.png')  ||
                            value.includes('image=true')
                        )
                        {
                            setBackground({
                                type: "image",
                                src: value,
                                overlay: 'rgba(0,0,0,0.2)',
                            });
                        }
                        else if (value.endsWith('.mp4') || value.includes('video=true')) {
                            setBackground({
                                type: "video",
                                src: value,
                                loop: true,
                                muted: false,
                            });
                        }

                    }}
                    options={[
                        {value: "https://api.qvqa.cn/api/cos?image=true&count=1&media=true", label: '随机图片'},
                        {value: "https://api.qvqa.cn/api/cos?video=true&count=1&media=true", label: '随机视频'},
                        {value: "/videos/丝柯克/pc.mp4", label: '丝柯克(PC)'},
                        {value: "/videos/丝柯克/mob.mp4", label: '丝柯克(MOB)'},
                    ]}
                />
            ),
        },
        {
            key: '2',
            label: '背景设置',
            children: (
                <Group
                    style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}
                    onChange={(e) => {
                        const value = e.target.value
                        if (value == "muted") return setBackground({muted: true});
                        else if (value == "!muted") return setBackground({muted: false});
                        else if (value == "loop") return setBackground({loop: true});
                        else if (value == "!loop") return setBackground({loop: false});

                        else return resetBackground()
                    }}
                    options={[
                        {value: "muted", label: '开启静音(视频)'},
                        {value: "!muted", label: '关闭静音(视频)'},
                        {value: "loop", label: '开启循环播放(视频)'},
                        {value: "!loop", label: '关闭循环播放(视频)'},
                        {value: " ", label: '清空背景'},
                    ]}
                />
            ),
        },
    ];

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <>

            <div
                onClick={() => setIsModalOpen(true)}
                style={{
                    fontSize: isMobile ? '60px' : '100px',
                    fontWeight: 'bold',
                    color: 'transparent', // 透明文字
                    WebkitTextStroke: '1px #8fd3f4', // 添加描边效果
                    WebkitFontSmoothing: 'ge',
                    textAlign: 'center',
                }}>
                {time}
            </div>
            <Modal
                // title="简心运维"
                // closable={{'aria-label': 'Custom Close Button'}}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
            </Modal>
        </>
    );
};


export default MenuComponent;

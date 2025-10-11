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
    const {setBackground,resetBackground} = useGlobalBackground();

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
            label: '背景切换(原神)',
            children: (
                <Group
                    style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}
                    onChange={(e) => {
                        const value = e.target.value
                        // 判断后缀为.jpg 或 .MP4
                        if (value.endsWith('.jpg') || value.endsWith('.webp') || value.endsWith('.png')) {
                            setBackground({
                                type: "image",
                                src: value,
                                overlay: 'rgba(0,0,0,0.2)',
                            });
                        }
                        if (value.endsWith('.mp4')) {
                            setBackground({
                                type: "video",
                                src: value,
                                poster: "/images/pc/1.jpg",
                                loop: false,
                                muted: false,
                            });
                        }

                        resetBackground()
                    }}
                    options={[
                        {value: "/videos/丝柯克/pc.mp4", label: '丝柯克(PC)'},
                        {value: "/videos/丝柯克/mob.mp4", label: '丝柯克(MOB)'},
                        {value: " ", label: '关闭背景'},
                    ]}
                />
            ),
        },
        // {
        //     key: '2',
        //     label: 'Tab 2',
        //     children: 'Content of Tab Pane 2',
        // },
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

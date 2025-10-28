"use client"
import React, {useEffect, useState} from 'react';
import {Modal, Tabs, Radio} from 'antd';
import type {TabsProps} from 'antd';
import useDeviceDetection from "@/hooks/useDeviceDetection";
import {useGlobalBackground} from "@/hooks/useGlobalBackground";
import type {StaticDirectoryStructure} from "@/types/staticDirectoryStructure";
import TimeDisplay from './TimeDisplay'; // 引入新的时间组件


const {Group} = Radio;


const MenuComponent: React.FC = () => {
    const {isMobile} = useDeviceDetection();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setBackground, resetBackground} = useGlobalBackground();
    const [staticData, setStaticData] = useState<StaticDirectoryStructure>();

    useEffect(() => {
        // 监听键盘按键
        const fe = async () => {
            const resp = await fetch('static_directory_structure.json')
            const data: StaticDirectoryStructure = await resp.json()
            setStaticData(data)
        };

        fe().then(() => {
            console.log('静态目录结构加载完毕')
        });
    }, []);

    if (!staticData) return [];


    // 遍历生成图片选项
    const imageOptions: Array<{ value: string; label: string }> = [];
    if (staticData?.assets?.images) {
        Object.keys(staticData.assets.images).forEach(category => {
            const categoryItems = staticData.assets.images?.[category];
            if (Array.isArray(categoryItems)) {
                // 处理直接数组类型的图片分类
                categoryItems.forEach((path: string) => {
                    // 根据设备类型过滤资源
                    if (isMobile && path.includes('/mobile/')) {
                        imageOptions.push({
                            value: path,
                            label: `${path.split('/').pop()}`,
                        });
                    } else if (!isMobile && path.includes('/desktop/')) {
                        imageOptions.push({
                            value: path,
                            label: ` ${path.split('/').pop()}`,
                        });
                    } else if (!path.includes('/mobile/') && !path.includes('/desktop/')) {
                        // 处理不区分设备类型的资源
                        imageOptions.push({
                            value: path,
                            label: `${path.split('/').pop()}`,
                        });
                    }
                });
            } else if (categoryItems) {
                // 处理嵌套对象类型的图片分类
                Object.keys(categoryItems).forEach(subCategory => {
                    const subItems = categoryItems?.[subCategory];
                    if (Array.isArray(subItems)) {
                        subItems.forEach((path: string) => {
                            // 根据设备类型过滤资源
                            if (isMobile && path.includes('/mobile/')) {
                                imageOptions.push({
                                    value: path,
                                    label: `${category} ${path.split('/').pop()}`,
                                });
                            } else if (!isMobile && path.includes('/desktop/')) {
                                imageOptions.push({
                                    value: path,
                                    label: `${category} ${path.split('/').pop()}`,
                                });
                            } else if (!path.includes('/mobile/') && !path.includes('/desktop/')) {
                                // 处理不区分设备类型的资源
                                imageOptions.push({
                                    value: path,
                                    label: `${category}: ${path.split('/').pop()}`,
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    // 遍历生成视频选项
    const videoOptions: Array<{ value: string; label: string }> = [];
    if (staticData?.assets?.videos) {
        Object.keys(staticData.assets.videos).forEach(category => {
            const categoryItems = staticData.assets.videos?.[category];
            if (categoryItems) {
                Object.keys(categoryItems).forEach(deviceType => {
                    // 根据设备类型过滤资源
                    if ((isMobile && deviceType === 'mobile') || (!isMobile && deviceType === 'desktop')) {
                        const items = categoryItems?.[deviceType];
                        if (Array.isArray(items)) {
                            items.forEach((path: string) => {
                                videoOptions.push({
                                    value: path,
                                    label: `${category}${path.split('/').pop()}`,
                                });
                            });
                        }
                    }
                });
            }
        });
    }


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '背景切换',
            children: (
                <>
                    <Group
                        style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8}}
                        onChange={(e) => {
                            const value = e.target.value
                            // 判断后缀为.jpg 或 .MP4
                            if (
                                value.endsWith('.jpg') ||
                                value.endsWith('.webp') ||
                                value.endsWith('.png') ||
                                value.includes('image=true')
                            ) {
                                setBackground({
                                    type: "image",
                                    src: value,
                                    overlay: 'rgba(0,0,0,0.2)',
                                });
                            } else if (value.endsWith('.mp4') || value.includes('video=true')) {
                                setBackground({
                                    type: "video",
                                    src: value,
                                    loop: true,
                                    muted: false,
                                });
                            }

                        }}
                        options={[
                            ...imageOptions,
                            ...videoOptions
                        ]}
                    />
                    <br/>
                    <hr/>
                    <p>Tips: 不同设备显示的资源会有所不同哟</p>
                </>
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

    console.log('测试')

    return (
        <>
            <TimeDisplay onClick={() => setIsModalOpen(true)}/>

            <Modal
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" items={items}/>
            </Modal>
        </>
    );
};


export default MenuComponent;

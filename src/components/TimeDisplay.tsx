"use client"
import React, { useEffect, useState } from 'react';
import useDeviceDetection from "@/hooks/useDeviceDetection";
import { theme } from "antd";

const TimeDisplay: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const [time, setTime] = useState<string>('');
    const { isMobile } = useDeviceDetection();
    const { token } = theme.useToken();

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

    return (
        <div
            onClick={onClick}
            style={{
                fontSize: isMobile ? '60px' : '100px',
                fontWeight: 'bold',
                color: 'transparent',
                WebkitTextStroke: `1px ${token.colorBorder}`,
                WebkitFontSmoothing: 'ge',
                textAlign: 'center',
            }}>
            {time}
        </div>
    );
};

export default TimeDisplay;

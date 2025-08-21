import React, { useEffect, useState } from "react";
import config from "../config";
import { CssConfig } from "../config";

const Content: React.FC = () => {
    const [now, setNow] = useState<Date>(new Date());
    const textColor = (config.css as CssConfig).text.color;

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formattedDateTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return (
        <>
            <main style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div className='time' style={{ color: textColor }}>
                    {config.title}
                    <hr />
                    {formattedDateTime}
                </div>
            </main>

            <style>
                {`
                    .time {
                        font-size: 50px;
                    }
                    
                    @media (max-width: 768px) {
                        .time {
                            font-size: 25px;
                        }
                    }    
                `}
            </style>
        </>
    );
};

export default Content;
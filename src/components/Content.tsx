import {useEffect, useState} from "react";
import config from "../config.ts";

export default function Content() {
    const [now, setNow] = useState(new Date());
    const textColor = config.css.text.color;

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        // 清除定时器
        return () => clearInterval(timer);
    }, []);

    // 获取完整的日期和时间字符串
    const formattedDateTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // 使用24小时制
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
                <div className='time' style={{color: textColor}}>
                    {config.title}
                    <hr />
                    {formattedDateTime}
                </div>


                {/*<div>*/}
                {/*    {*/}
                {/*        config.menus.map((menu, index) => (*/}
                {/*            <button*/}
                {/*                key={index}*/}
                {/*                onClick={() => window.open(menu.url)}*/}
                {/*                style={{*/}
                {/*                    width: '125px',*/}
                {/*                    height: '50px',*/}
                {/*                    color: textColor,*/}
                {/*                    backgroundColor: 'transparent',*/}
                {/*                    padding: '12px 24px',*/}
                {/*                    borderRadius: '10px',*/}
                {/*                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',*/}
                {/*                    transition: 'all 0.3s ease',*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                {menu.title}*/}
                {/*            </button>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</div>*/}

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
    )
}


import {useState, useEffect} from 'react'

import styles from './App.module.scss'


function App() {
    const [now, setNow] = useState(new Date());

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
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.gradient}> 简 心 运 维 </h1>
                <br/>
                <p>{formattedDateTime}</p>
            </div>
            <div className={styles.footer}>
                &copy;{new Date().getFullYear()} Created by 简心运维
                &nbsp;&nbsp;
{/*                 <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2023042170号-1</a>
                &nbsp;&nbsp;
                <img src='https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png'
                     style={{width: '17px', height: 'auto'}} alt=""/>
                <a href="https://beian.mps.gov.cn/#/query/webSearch?code=37092102000264" rel="noreferrer"
                   target="_blank">鲁公网安备37092102000264</a> */}
                <div style={{fontSize: '14px'}}>
                    <a href="https://beian.miit.gov.cn/" target="_blank"
                       style={{color: '#bbbbbb'}}>鲁ICP备2023042170号-1</a>
                    <div>
                        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=37092102000264" rel="noreferrer"
                           target="_blank" style={{color: '#bbbbbb'}}>鲁公网安备37092102000264</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

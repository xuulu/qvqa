// import { useState } from 'react'

import styles from './App.module.scss'

function App() {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <br/><br/><br/><br/>
                <h1 className={styles.gradient}> 简 心 运 维 </h1>
            </div>
            <div className={styles.footer}>
                &copy;{new Date().getFullYear()} Created by 简心运维
                &nbsp;&nbsp;
                <a href="https://beian.miit.gov.cn/" target="_blank">鲁ICP备2023042170号-1</a>
                &nbsp;&nbsp;
                <img src='https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png'
                     style={{width: '17px', height: 'auto'}} alt="" />
                <a href="https://beian.mps.gov.cn/#/query/webSearch?code=37092102000264" rel="noreferrer"
                   target="_blank">鲁公网安备37092102000264</a>

            </div>
        </div>
    )
}

export default App

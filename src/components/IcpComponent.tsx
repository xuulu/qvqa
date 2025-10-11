import React from "react";

const IcpComponent: React.FC = () => {
    const textColor = "rgba(255,255,255,0.5)";
    const fontSize = "0.875rem";

    return (
        <>
            <footer
                style={{
                    marginTop: "auto",
                    color: textColor,
                    fontSize: fontSize,
                    // textAlign: 'center',
                }}
            >
                <span>&copy;{new Date().getFullYear()}</span>
                <span>Created by 简心运维</span>
                {"  "}
                <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        textDecoration: "none",
                        color: textColor,
                        fontSize: fontSize,
                    }}
                >
                    鲁ICP备2023042170号-1
                </a>
                {"  "}
                <img
                    src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png"
                    alt=""
                    style={{
                        width: "17px",
                        height: "auto",
                    }}
                />
                <a
                    href="https://beian.mps.gov.cn/#/query/webSearch?code=37092102000264"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        textDecoration: "none",
                        color: textColor,
                        fontSize: fontSize,
                    }}
                >
                    鲁公网安备37092102000264
                </a>
            </footer>

            <style>{`
                @media (max-width: 768px) {
                    footer a,
                    footer img {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default IcpComponent;
import React from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import BackgroundSlider from "./components/BackgroundSlider";

const App: React.FC = () => {
    return (
        <>
            <BackgroundSlider />
            <div style={{
                minHeight: '100vh',
                width: '100%',
                padding: '20px 50px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Content />
                <Footer />
            </div>
        </>
    );
};

export default App;

// import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

import BackgroundSlider from "./components/BackgroundSlider"


function App() {


    return (
        <>
            <BackgroundSlider/>


            <div style={{
                minHeight: '100vh',
                width: '100%',

                padding: '20px 50px',

                display: 'flex',
                flexDirection: 'column',    // 垂直分布
                justifyContent: 'space-between', // 水平分布
                alignItems: 'center',           // 垂直居中
            }}>

                {/*<Header/>*/}
                <Content/>
                <Footer/>
            </div>
        </>
    )
}

export default App

import {Flex} from "antd";
import SearchBox from "@/components/SearchBox"
import MenuComponent from "@/components/MenuComponent"
import IcpComponent from "@/components/IcpComponent";


export default function Home() {
    return (
        <Flex vertical justify="center" align="center" style={{width: "100%", height: "100vh"}}>

            <Flex vertical justify="center" align="center" gap="middle" style={{width: "100%", height: "70vh"}}>
                {/*时间组件*/}
                <MenuComponent/>

                {/*搜索框*/}
                <SearchBox/>
            </Flex>


            <IcpComponent/>
        </Flex>
    );
}

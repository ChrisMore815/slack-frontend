import { useContext } from "react";
import { VStack } from "@chakra-ui/react";

import MainNav from './MainNav'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MessageBox from "../../../components/MessageBox";
import { SocketContext } from "../../../contexts/SocketProvider";

const Main = () => {

    const { selectedCurChannel } = useContext(SocketContext)
    console.log(selectedCurChannel)

    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={"0px 8px 8px 0px"}>
        <MainHeader data={selectedCurChannel} />
        <MainNav />
        <MainContent data={selectedCurChannel} />
        <MessageBox />
    </VStack>
}

export default Main
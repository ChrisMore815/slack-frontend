import { VStack } from "@chakra-ui/react";
import MainHeader from './MainHeader'
import MainNav from './MainNav'
import MainContent from './MainContent'
import MessageBox from "../../../components/MessageBox";

const Main = () => {
    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={"0px 8px 8px 0px"}>
        <MainHeader />
        <MainNav />
        <MainContent />
        <MessageBox />
    </VStack>
}

export default Main
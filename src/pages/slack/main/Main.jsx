import { useContext, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import MainNav from './MainNav'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MessageBox from "../../../components/MessageBox";
import { SocketContext } from "../../../contexts/SocketProvider";
import { AuthContext } from "../../../contexts/AuthProvider";

const Main = () => {

    const { auth } = useContext(AuthContext);
    const { socket, selectedCurChannel } = useContext(SocketContext);

    const [userInfo, setUserInfo] = useState({
        sender: '',
        channelId: "",
        receivers: [],
        message: "",
        files: [],
        emoticons: [],
        isPinned: false,
        parentId: ""
    });

    useEffect(() => {
        setUserInfo({...userInfo, channelId: selectedCurChannel._id, })
    }, [])

    const send = () => {

    }

    console.log(selectedCurChannel)

    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={"0px 8px 8px 0px"}>
        <MainHeader data={selectedCurChannel} />
        <MainNav />
        <MainContent data={selectedCurChannel} />
        <MessageBox send={send} userInfo={userInfo} setUserInfo={setUserInfo} />
    </VStack>
}

export default Main
import { useContext, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import MainNav from './MainNav'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MessageBox from "../../../components/MessageBox";
import { AuthContext } from "../../../contexts/AuthProvider";
import { SocketContext } from "../../../contexts/SocketProvider";

const Main = () => {

    const { auth } = useContext(AuthContext);
    const { selectedCurChannel, selectedChMsg, showThread, userInfo, setUserInfo } = useContext(SocketContext);

    const [status, setStatus] = useState('Messages');

    useEffect(() => {
        if (selectedCurChannel) {
            if (selectedCurChannel.isDm == false) {
                setUserInfo({ ...userInfo, sender: auth._id, channelId: selectedCurChannel._id })
            } else {
                let temp = [];
                selectedCurChannel.members?.forEach(member => temp.push(member._id));
                setUserInfo({ ...userInfo, receivers: [...temp], channelId: selectedCurChannel._id })
            }
        }
    }, [selectedCurChannel])

    useEffect(() => {
        if (showThread) {
            setUserInfo({ ...userInfo, parentId: showThread })
        }
    }, [showThread])

    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={showThread == "" ? "0px 8px 8px 0px" : "none"}>
        <MainHeader data={selectedCurChannel} />
        <MainNav status={status} setStatus={setStatus} />
        <MainContent msg={selectedChMsg} status={status} />
        <MessageBox />
    </VStack>
}

export default Main
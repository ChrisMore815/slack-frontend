import { useContext, useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";

import MainNav from './MainNav'
import MainHeader from './MainHeader'
import MainContent from './MainContent'
import MessageBox from "../../../components/MessageBox";
import socketEvents from "../../../constants/socketEvents";
import { AuthContext } from "../../../contexts/AuthProvider";
import { SocketContext } from "../../../contexts/SocketProvider";

const Main = () => {

    const { auth } = useContext(AuthContext);
    const { socket, selectedCurChannel, selectedChMsg } = useContext(SocketContext);

    const [userInfo, setUserInfo] = useState({
        sender: null,
        channelId: null,
        receivers: [],
        message: "",
        files: [],
        emoticons: [],
        isPinned: false,
        parentId: null
    });

    useEffect(() => {
        if (selectedCurChannel.isDm == false) {
            setUserInfo({ ...userInfo, sender: auth._id, channelId: selectedCurChannel._id })
        } else {
            setUserInfo({ ...userInfo, channelId: selectedCurChannel._id })
        }
    }, [selectedCurChannel])

    const pinHandler = (id) => {
        console.log(id);
        socket.emit(socketEvents.UPDATEMESSAGE, { isPinned: true })
    }

    const editHandler = (id) => {
        console.log(id)
    }

    const deleteHandler = (id) => {
        console.log(id);
    }

    const handleSend = () => {
        socket.emit(socketEvents.CREATEMESSAGE, userInfo);
    }



    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={"0px 8px 8px 0px"}>
        <MainHeader data={selectedCurChannel} />
        <MainNav />
        <MainContent msg={selectedChMsg} handleEdit={editHandler} handleDelete={deleteHandler} handlePin={pinHandler} />
        <MessageBox send={handleSend} userInfo={userInfo} setUserInfo={setUserInfo} />
    </VStack>
}

export default Main
import { useContext, useEffect } from "react";
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
    const { socket, selectedCurChannel, selectedChMsg, showThread, userInfo, setUserInfo } = useContext(SocketContext);


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

    const pinHandler = (id, message) => {
        socket.emit(socketEvents.UPDATEMESSAGE, { id, message: { ...message, sender: message.sender._id } })
    }

    const editHandler = (id) => {
        console.log(id)
    }

    const deleteHandler = (id) => {
        socket.emit(socketEvents.DELETEMESSAGE, id);
    }

    const emoticonHandler = () => {

    }


    return <VStack flex={"1 1 0"} bg={"#fff"} height={"100%"} rounded={showThread == "" ? "0px 8px 8px 0px" : "none"}>
        <MainHeader data={selectedCurChannel} />
        <MainNav />
        <MainContent msg={selectedChMsg} handleEdit={editHandler} handleDelete={deleteHandler} handlePin={pinHandler} handleEmoticon={emoticonHandler} />
        <MessageBox userInfo={userInfo} setUserInfo={setUserInfo} />
    </VStack>
}

export default Main
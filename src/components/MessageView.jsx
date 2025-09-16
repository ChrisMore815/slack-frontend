import React, { useContext, useState } from "react";
import propTypes from 'prop-types'
import { HStack, Image, VStack, Wrap, Text, Icon, Flex, Box } from "@chakra-ui/react";

import icons from "../constants/icons";
import Emoticons from '../components/Emoticons'
import { serverUrl } from '../constants/serverUrl'
import socketEvents from "../constants/socketEvents";
import { AuthContext } from "../contexts/AuthProvider";
import { SocketContext } from "../contexts/SocketProvider";

const MessageView = (props) => {
    const { curUser, msg } = props;

    const { auth } = useContext(AuthContext);
    const { setShowThread, socket, selectedCurChannel } = useContext(SocketContext);

    const [show, setShow] = useState("");
    const [view, setView] = useState("");
    const [emoticon, setEmoticon] = useState([]);

    const handleShow = (id) => {
        setShow(id)
    }

    const handleLeave = () => {
        setShow('')
    }

    const handleV = () => {
        setView("");
    }

    const handleView = () => {
        setView("view")
    }

    const handlePin = (message) => {
        let temp = message.isPined?.includes(auth._id) ? message.isPined.filter((pinId) => pinId != auth._id) : [...message.isPined, auth._id];
        socket.emit(socketEvents.UPDATEMESSAGE, { id: message._id, message: { ...message, isPined: [...temp], sender: message.sender } })
    }

    const handleThread = (id) => {
        setShowThread(id);
        socket.emit(socketEvents.READMESSAGE, id)
    }

    const handleEdit = () => {

    }

    const handleEmoticon = (msg, emoticon) => {
        // console.log(msg, emoticon)
        let temp;
        msg.emoticons.length > 0 ? msg.emoticons.forEach((emoticon) => {
            console.log(emoticon)
            return temp = emoticon.recommenders?.includes(auth._id) ? emoticon.recommenders.filter((recommender) => recommender != auth._id) : [...emoticon.recommenders, auth._id]
        }) : setEmoticon([...emoticon, emoticon])
        // socket.emit(socketEvents.UPDATEMESSAGE, {id: msg._id, emoticons: msg.emoticons.})
    }
    console.log(emoticon);

    const handleDelete = (id) => {
        socket.emit(socketEvents.DELETEMESSAGE, id);
    }

    return <HStack w={"100%"} h={"fit-content"} color={"#000"} gap={4} align={"flex-start"} onMouseOver={() => handleShow(msg._id)} onMouseLeave={() => handleLeave()} py={2}>
        <Image w={"40px"} rounded={8} h={"40px"} src={`${serverUrl}/avatar/${curUser.avatar}`} />
        <VStack flex={"1 1 0"} h={"100%"}>
            <VStack h={"40px"} w={"100%"}>
                <HStack w={"100%"} justify={"space-between"} pos={"relative"}>
                    <Text>{curUser.username}</Text>
                    <HStack w={"fit-content"} pos={"absolute"} right={0} gap={1} p={2} display={show == msg._id ? "flex" : "none"} border={"1px solid #ddd"} fontSize={"20px"}>
                        <Icon cursor={"pointer"} onClick={() => handlePin(msg)}>{msg.isPined.includes(auth._id) ? icons.pinned : icons.pin}</Icon>
                        <HStack pos={"relative"} onMouseOver={handleView} onMouseLeave={handleV}>
                            <Icon cursor={"pointer"}>{icons.emoticon}</Icon>
                            <Flex display={view ? "flex" : "none"} justify={"center"} align={"center"} p={"8px"} border={"1px solid #ccc"} bg={"#fff"} boxShadow={"0px 0px 5px 0px #323232"} pos={"absolute"} zIndex={10} top={"20px"} right={0} minW={"200px"} maxH={"160px"}>
                                <Emoticons handleRecommend={handleEmoticon} msg={msg} />
                            </Flex>
                        </HStack>
                        <Icon cursor={"pointer"} display={selectedCurChannel.isDm == false ? "flex" : "none"} onClick={() => handleThread(msg._id)}>{icons.threads}</Icon>
                        <HStack display={curUser._id == auth._id ? "flex" : "none"}>
                            <Icon cursor={"pointer"} onClick={() => handleEdit(msg._id)}>{icons.edit}</Icon>
                            <Icon cursor={"pointer"} onClick={() => handleDelete(msg._id)}>{icons.delete}</Icon>
                        </HStack>
                    </HStack>
                </HStack>
                <HStack w={"100%"}><Text>{ }</Text></HStack>
            </VStack>
            <Wrap flex={"1 1 0"} w={"100%"}>
                <Text>
                    {msg.message}
                </Text>
            </Wrap>
        </VStack>
    </HStack>
}






























MessageView.propTypes = {
    msg: propTypes.object.isRequired,
    curUser: propTypes.object.isRequired,
}

export default MessageView;
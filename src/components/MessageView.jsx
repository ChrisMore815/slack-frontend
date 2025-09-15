import React, { useState } from "react";
import propTypes from 'prop-types'
import { HStack, Image, VStack, Wrap, Text, Icon } from "@chakra-ui/react";
import { serverUrl } from '../constants/serverUrl'
import icons from "../constants/icons";

const MessageView = (props) => {
    const { msg, handleDelete, handleEdit, handlePin } = props;

    const [show, setShow] = useState("")

    const handleShow = (id) => {
        setShow(id)
    }

    const handleLeave = () => {
        setShow('')
    }

    return <HStack w={"100%"} h={"fit-content"} color={"#000"} gap={4} align={"flex-start"} onMouseOver={() => handleShow(msg._id)} onMouseLeave={() => handleLeave()}>
        <Image w={"40px"} rounded={8} h={"40px"} src={`${serverUrl}/avatar/${msg.sender.avatar}`} />
        <VStack flex={"1 1 0"} h={"100%"}>
            <VStack h={"40px"} w={"100%"}>
                <HStack w={"100%"} justify={"space-between"} pos={"relative"}>
                    <Text>{msg.sender.username}</Text>
                    <HStack w={"fit-content"} pos={"absolute"} right={0} gap={1} p={2} display={show == msg._id ? "flex" : "none"} border={"1px solid #ddd"} fontSize={"20px"}>
                        <Icon cursor={"pointer"} onClick={() => handlePin(msg._id)}>{icons.pin}</Icon>
                        <Icon cursor={"pointer"} onClick={() => handleEdit(msg._id)}>{icons.emoticon}</Icon>
                        <Icon cursor={"pointer"} onClick={() => handleEdit(msg._id)}>{icons.edit}</Icon>
                        <Icon cursor={"pointer"} onClick={() => handleDelete(msg._id)}>{icons.delete}</Icon>
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
    src: propTypes.string.isRequired,
    msg: propTypes.object.isRequired,
    handlePin: propTypes.func.isRequired,
    handleEdit: propTypes.func.isRequired,
    handleDelete: propTypes.func.isRequired
}

export default MessageView;
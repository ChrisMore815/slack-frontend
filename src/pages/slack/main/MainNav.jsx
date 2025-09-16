import { useContext, useState } from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";

import icons from "../../../constants/icons";
import { SocketContext } from "../../../contexts/SocketProvider";
import socketEvents from "../../../constants/socketEvents";
import { AuthContext } from "../../../contexts/AuthProvider";

const MainNav = (props) => {
    const { status, setStatus } = props;
    const { auth } = useContext(AuthContext)
    const { socket } = useContext(SocketContext)

    const handleMessages = (state) => {
        setStatus(state);
    }
    const handleFiles = (state) => {
        setStatus(state);
    }
    const handlePined = (state) => {
        setStatus(state);
        socket.emit(socketEvents.PINNED, auth._id)
    }

    return <HStack w={"100%"} h={"40px"} p={2} color={"#000"} fontSize={"20px"} gap={4} align={"center"}>
        <HStack w={"fit-content"} gap={1} align={"center"} cursor={"pointer"} borderBottom={status == "Messages" ? "2px solid black" : "none"} onClick={() => handleMessages("Messages")}>
            <Icon pt={1}>{icons.threads}</Icon>
            <Text>Messages</Text>
        </HStack>
        <HStack w={"fit-content"} gap={1} align={"center"} cursor={"pointer"} borderBottom={status == "Files" ? "2px solid black" : "none"} onClick={() => handleFiles("Files")}>
            <Icon pt={1}>{icons.file}</Icon>
            <Text>Files</Text>
        </HStack>
        <HStack w={"fit-content"} gap={1} align={"center"} cursor={"pointer"} borderBottom={status == "Pin" ? "2px solid black" : "none"} onClick={() => handlePined("Pin")}>
            <Icon pt={1}>{icons.pinned}</Icon>
            <Text>Pin</Text>
        </HStack>
    </HStack>
}

export default MainNav
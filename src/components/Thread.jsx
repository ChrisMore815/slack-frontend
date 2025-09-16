import React, { useContext } from "react";
import { Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";

import MessageBox from "./MessageBox";
import icons from "../constants/icons";
import socketEvents from "../constants/socketEvents";
import { SocketContext } from "../contexts/SocketProvider";

const Thread = () => {

    const { setShowThread, socket, userInfo } = useContext(SocketContext);

    const handleSend = () => {
        console.log(userInfo)
        socket.emit(socketEvents.CREATEMESSAGE, userInfo);
    }


    return <VStack w={"30%"} h={"100%"} bg={"#fff"} color={"#000"} rounded={"0px 8px 8px 0px"} boxShadow={"-3px 0px 0px 0px #ccc"}>
        <HStack w={"100%"} justify={"space-between"} p={"8px 16px"} fontSize={"20px"}>
            <Text>Thread</Text>
            <Icon onClick={() => setShowThread("")}>{icons.close}</Icon>
        </HStack>
        <Flex>

        </Flex>
        <MessageBox send={handleSend} />
    </VStack>
}

export default Thread;
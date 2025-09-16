import React, { useContext } from "react";
import { VStack, HStack, Textarea, Icon } from "@chakra-ui/react";
import icons from "../constants/icons";
import { SocketContext } from "../contexts/SocketProvider";

const MessageBox = (props) => {

    const { send } = props;
    const { userInfo, setUserInfo } = useContext(SocketContext)

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, message: e.target.value });
    }

    const handleSend = () => {
        send();
    }

    return <VStack w={"95%"} h={"180px"} color={'#000'} justify={"center"} align={"center"}>
        <HStack width={"100%"} fontSize={"22px"} bg={"#0001"} p={2} gap={4} >
            <Icon>{icons.typeBold}</Icon>
            <Icon>{icons.typeStrikeThrough}</Icon>
            <Icon>{icons.typeItalic}</Icon>
            <Icon>{icons.typeUnderline}</Icon>
            <Icon>{icons.typeListBulleted}</Icon>
            <Icon>{icons.typeListNumbered}</Icon>
        </HStack>
        <Textarea resize={"none"} rows={3} width={"100%"} _focus={{ border: "0.5px solid #0004" }} borderRadius={"none"} onChange={handleChange} />
        <HStack w={"100%"} justify={"space-between"} fontSize={"22px"} bg={"#0001"} p={2} gap={4}>
            <HStack gap={4}>
                <Icon>{icons.plus}</Icon>
                <Icon>{icons.atmark}</Icon>
                <Icon>{icons.emoticon}</Icon>
                <Icon>{icons.camera}</Icon>
                <Icon>{icons.voice}</Icon>
            </HStack>
            <Icon onClick={handleSend}>{icons.send}</Icon>
        </HStack>
    </VStack>
}

export default MessageBox;
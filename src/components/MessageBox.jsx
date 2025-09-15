import React from "react";
import { VStack, HStack, Textarea, Icon } from "@chakra-ui/react";
import icons from "../constants/icons";

const MessageBox = (props) => {
    return <VStack w={"95%"} h={"180px"} color={'#000'} justify={"center"} align={"center"}>
        <HStack width={"100%"} fontSize={"22px"} bg={"#0001"} p={2} gap={4} >
            <Icon>{icons.typeBold}</Icon>
            <Icon>{icons.typeStrikeThrough}</Icon>
            <Icon>{icons.typeItalic}</Icon>
            <Icon>{icons.typeUnderline}</Icon>
            <Icon>{icons.typeListBulleted}</Icon>
            <Icon>{icons.typeListNumbered}</Icon>
        </HStack>
        <Textarea resize={"none"} rows={3} width={"100%"} _focus={{ border: "0.5px solid #0004" }} borderRadius={"none"} onChange={props.handleChange} />
        <HStack w={"100%"} fontSize={"22px"} bg={"#0001"} p={2} gap={4}>
            <Icon>{icons.plus}</Icon>
            <Icon>{icons.atmark}</Icon>
            <Icon>{icons.emoticon}</Icon>
            <Icon>{icons.camera}</Icon>
            <Icon>{icons.voice}</Icon>
        </HStack>
    </VStack>
}

export default MessageBox;
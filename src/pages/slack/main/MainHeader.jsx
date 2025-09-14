import React from "react";
import { HStack, Text, Icon } from "@chakra-ui/react";
import icons from "../../../constants/icons";

const MainHeader = () => {
    return <HStack w={'100%'} h={"72px"} p={4} justify={"space-between"} color={"#000"}>
        <HStack fontWeight={"bold"} gap={1}>
            <Text>#</Text>
            <Text>myChannel</Text>
        </HStack>
        <HStack>
            <HStack></HStack>
            <Icon fontSize={"18px"} cursor={"pointer"}>{icons.earphone}</Icon>
            <Icon fontSize={"18px"} cursor={"pointer"}>{icons.more}</Icon>
        </HStack>
    </HStack>
}

export default MainHeader
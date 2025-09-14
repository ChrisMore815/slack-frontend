import React from "react";
import propTypes from 'prop-types'
import { HStack, Image, VStack, Wrap, Text } from "@chakra-ui/react";
import { serverUrl } from '../constants/serverUrl'

const MessageView = (props) => {
    return <HStack w={"100%"} h={"fit-content"}>
        <Image w={"40px"} rounded={8} h={"40px"} src={`${serverUrl}/avatar/${props.src}`} />
        <VStack flex={"1 1 0"} h={"100%"}>
            <VStack h={"40px"} w={"100%"}>
                <HStack>{}</HStack>
                <HStack>{}</HStack>
            </VStack>
            <Wrap flex={"1 1 0"} w={"100%"}>
                <Text></Text>
            </Wrap>
        </VStack>
    </HStack>
}






























MessageView.propTypes = {
    src: propTypes.string.isRequired
}

export default MessageView;
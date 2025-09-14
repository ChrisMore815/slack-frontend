import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
    return <Flex w={"full"} h={"100vh"} justify={"center"} align={"center"}>
        <Spinner pos={'fixed'} top={"50%"} left={"50%"} thickness={"8px"} size={"xl"} color={"linear-gradient"} speed={"0.7s"} />
        <Spinner thickness={"6px"} size={"lg"} color={"green.500"} speed={"0.5s"} />
        <Spinner thickness={"4px"} size={"lg"} color={"blue.500"} speed={"0.3s"} />
    </Flex>
}

export default Loading
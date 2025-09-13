import * as FaIcons from 'react-icons/fa';

import { Flex, Icon, Text, HStack } from "@chakra-ui/react";

const Icons = () => {
    return (
        <Flex wrap={'wrap'} justify={"center"} align={"center"}>
            {Object.keys(FaIcons).map((item, index) => {
                const FaIcon = FaIcons[item];
                return <HStack key={index} minW={"400px"} gap={"10"} p={"12"}>
                    <Icon fontSize={"24px"}>
                        <FaIcon />
                    </Icon>
                    <Text>{item}</Text>
                </HStack>
            })}
        </Flex>
    )
}

export default Icons;
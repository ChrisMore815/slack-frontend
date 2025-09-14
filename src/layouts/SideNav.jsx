import { Icon, VStack, Text } from '@chakra-ui/react';
import { sidenav } from './sidenavconstants';
import icons from '../constants/icons';

const SideNav = () => {
    return <VStack w={"72px"} h={"100%"} p={"48px 8px 8px 8px"} justify={"space-between"}>
        <VStack gap={4} w={"full"}>
            {sidenav.map((item, index) => {
                return (
                    <VStack key={index} w={"full"} color={"#fff"} bg={"transparent"} gap={1}>
                        <Icon fontSize={"20px"} bg={"transparent"} >{item.icon}</Icon>
                        <Text>{item.name}</Text>
                    </VStack>
                )
            })}
        </VStack>

    </VStack>
}

export default SideNav
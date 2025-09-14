import { HStack, Icon, Input } from '@chakra-ui/react';
import icons from '../constants/icons';

const Header = () => {
    return <HStack h={"40px"} w={"full"} align={"center"}>
        <HStack w={'var(--sidebar)'} color={"#fff"} justify={"flex-end"} gap={1} pr={1}>
            <Icon fontSize={"18px"}>{icons.prev}</Icon>
            <Icon fontSize={"18px"}>{icons.next}</Icon>
            <Icon fontSize={"18px"}>{icons.history}</Icon>
        </HStack>
        <HStack flex={"1 1 0"} color={'#fff'} justify={"space-between"} pr={1}>
            <Input p={"2px 32px 2px 8px"} type={"text"} w={"80%"} fontSize={"12px"} h={"28px"} fontStyle={"italic"} _placeholder={{color: "#FFF8"}} borderRadius={4} bg={"#6a3f6a"} placeholder={"Search in dogstarcoin..."} _focus={{ border: "1px solid #fff8" }} />
            <Icon fontSize={"18px"}>{icons.question}</Icon>
        </HStack>
    </HStack>
}

export default Header
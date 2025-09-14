import * as AiIcons from 'react-icons/ai'
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi'
import * as HiIcons from 'react-icons/hi';
import * as TiIcons from 'react-icons/ti';
import * as MdIcons from 'react-icons/md';
import * as VscIcons from 'react-icons/vsc';
import * as FcIcons from 'react-icons/fc';


import { Flex, Icon, Text, HStack } from "@chakra-ui/react";

const Icons = () => {
    return (
        <Flex wrap={'wrap'} justify={"center"} align={"center"}>
            {Object.keys(TiIcons).map((item, index) => {
                const FaIcon = TiIcons[item];
                return <HStack key={index} minW={"400px"} gap={"10"} p={"4"}>
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
import { useContext, useState } from 'react';
import { Icon, VStack, Text, Popover, PopoverTrigger, Box, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Button, HStack } from '@chakra-ui/react';
import { sidenav } from './sidenavconstants';
import BadgeAvatar from '../components/BadgeAvatar';
import Badge from '../components/Badge';
import { AuthContext } from '../contexts/AuthProvider';

const statusList = [
    { status: -1, displayText: "Logout" },
    { status: 0, displayText: "Busy" },
    { status: 1, displayText: "Active" },
]

const SideNav = () => {
    const { auth, logOut } = useContext(AuthContext);

    const handleChangeStatus = (status) => {
        console.log(status);
        if(status == -1) logOut()
    }

    return <VStack w={"72px"} h={"100%"} p={"48px 14px 14px 14px"} justify={"space-between"}>
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
        <VStack w={"100%"}>
            <Popover>
                <PopoverTrigger>
                    <Box w={"100%"}>
                        <BadgeAvatar src={'default.gif'} status={1}/>
                    </Box>
                </PopoverTrigger>
                <PopoverContent w={"fit-content"}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <VStack w={"120px"} h={"fit-content"} color={"#000"} p={2}>
                            {
                                statusList.map((item, index) => {
                                    if (item.status !== auth.status) {
                                        return <HStack key={index} pos={'relative'} w={"100%"} p={2 } cursor={"pointer"} onClick={() => handleChangeStatus(item.status)}>
                                            <Badge status={item.status} bottom={""} />
                                            <Text>{item.displayText}</Text>
                                        </HStack>
                                    }
                                })
                            }
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </VStack>

    </VStack>
}

export default SideNav
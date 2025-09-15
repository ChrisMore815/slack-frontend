import { useContext, useState } from "react";
import { VStack, HStack, Text, Icon } from "@chakra-ui/react";

import icons from "../../../constants/icons";
import CreateDM from "../../../components/CreateDM";
import BadgeAvatar from "../../../components/BadgeAvatar";
import socketEvents from "../../../constants/socketEvents";
import { AuthContext } from "../../../contexts/AuthProvider";
import CreateChannel from '../../../components/CreateChannel';
import { SocketContext } from "../../../contexts/SocketProvider";

const SideBar = () => {
    const { auth } = useContext(AuthContext)
    const { allChannels, socket, allDms, allUsers } = useContext(SocketContext);

    const [showDMModal, setShowDMModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState("");
    const [selectedChannel, setSelectedChannel] = useState({});

    const handleSelectChannel = (id) => {
        socket.emit(socketEvents.READCHANNEL, id);
    }

    const handleEdit = (id) => {
        setShowCreateModal('edit');
        setSelectedChannel(allChannels.filter((item) => item._id == id)[0])
    }

    const handleDelete = (id) => {
        socket.emit(socketEvents.DELETECHANNEL, id);
    }

    const handleShowCreateModal = (id) => {
        setShowCreateModal("create");
    }

    const handleShowCreateDMModal = () => {
        setShowDMModal(!showDMModal);
    }

    return <VStack w={"var(--sidebar)"} h={'100%'} bg={"#5c275cff"} rounded={"8px 0px 0px 8px"} p={"16px"}>
        <VStack w={"full"} gap={8} px={"8px"} justify={"flex-start"} align={"flex-start"}>
            <HStack justify={"space-between"} align={"center"} w={"100%"} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} p={"2px 4px 2px 16px"} rounded={4}>
                <HStack gap={1}>
                    <Text>dogstarcoin</Text>
                    <Icon fontSize={"18px"} pt={"6px"}>{icons.down}</Icon>
                </HStack>
                <Icon fontSize={"20px"} pt={"4px"}>{icons.edit}</Icon>
            </HStack>
            <VStack w={"100%"}>
                <HStack w={"100%"} p={"2px 8px"} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} gap={1} rounded={4}>
                    <Icon transform={"rotateY(180deg)"} fontSize={"20px"} pt={"4px"}>{icons.threads}</Icon>
                    <Text>Threads</Text>
                </HStack>
            </VStack>
            <VStack w={"100%"} gap={1}>
                <HStack w={"100%"} gap={1} p={"2px 8px"} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4}>
                    <Icon fontSize={"20px"} pt={"3px"}>{icons.caretDown}</Icon>
                    <Text>Channels</Text>
                </HStack>
                <VStack w={"100%"} gap={1}>
                    {
                        allChannels && allChannels.map((channel, index) => {
                            return <HStack w={'100%'} justify={"space-between"} cursor={"pointer"} px={2} gap={2} fontSize={"16px"} key={index} rounded={4} _hover={{ bg: "#fff", color: "var(--primary)" }}>
                                <HStack gap={2} onClick={() => handleSelectChannel(channel._id)}>
                                    <Text>#</Text>
                                    <Text>{channel.name}</Text>
                                </HStack>
                                <HStack gap={1} pt={1} display={channel.creator === auth._id ? "flex" : "none"}>
                                    <Icon onClick={() => handleEdit(channel._id)}>{icons.edit}</Icon>
                                    <Icon onClick={() => handleDelete(channel._id)}>{icons.delete}</Icon>
                                </HStack>
                            </HStack>
                        })
                    }
                </VStack>
                <HStack w={"100%"} p={"2px 8px"} gap={1} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} onClick={handleShowCreateModal}>
                    <Icon fontSize={"20px"} pt={"4px"}>{icons.plus}</Icon>
                    <Text>Add Channels</Text>
                </HStack>
            </VStack>
            <VStack w={"100%"} gap={1}>
                <HStack w={"100%"} gap={1} p={"2px 8px"} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} >
                    <Icon fontSize={"20px"} pt={"3px"}>{icons.caretDown}</Icon>
                    <Text>Direct Messages</Text>
                </HStack>
                <VStack w={"100%"} gap={1}>
                    {
                        allDms && allDms.map((dm) => {
                            return dm.members.map((member) => {
                                if (member._id !== auth._id) {
                                    return allUsers.map((user, index) => {
                                        if (member._id == user._id)
                                            return <HStack p={"2px 8px"} key={index} w={"100%"} py={1} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} cursor={"pointer"} gap={4} justify={"space-between"}>
                                                <HStack gap={2}>
                                                    <BadgeAvatar width={"28px"} height={"28px"} src={'default.gif'} status={user.status * 1} />
                                                    <Text>{user.username}</Text>
                                                </HStack>
                                                <Icon display={user._id == auth._id ? "flex": "nones"} pt={1} fontSize={'18px'} onClick={() => handleDelete(dm._id)}>{icons.delete}</Icon>
                                            </HStack>
                                    })
                                }
                            })
                        })
                    }
                </VStack>
                <HStack w={"100%"} p={"2px 8px"} gap={1} cursor={"pointer"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} onClick={handleShowCreateDMModal}>
                    <Icon fontSize={"20px"} pt={"4px"}>{icons.plus}</Icon>
                    <Text>Invite People</Text>
                </HStack>
            </VStack>
        </VStack>
        {showDMModal && <CreateDM open={showDMModal} setOpen={setShowDMModal} />}
        {showCreateModal && <CreateChannel open={showCreateModal} setOpen={setShowCreateModal} curChannel={selectedChannel} />}
    </VStack>
}

export default SideBar;
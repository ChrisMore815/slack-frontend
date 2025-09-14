import { VStack, HStack, Text, Icon } from "@chakra-ui/react";
import icons from "../../../constants/icons";
import { useState } from "react";
import CreateDM from "../../../components/CreateDM";

const SideBar = () => {

    const [showDMModal, setShowDMModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    }

    const handleShowCreateDMModal = () => {
        setShowDMModal(!showDMModal);
    }

    return <VStack w={"var(--sidebar)"} h={'100%'} bg={"#5c275cff"} rounded={"8px 0px 0px 8px"} p={"16px"}>
        <VStack w={"full"} gap={8} px={"8px"} justify={"flex-start"} align={"flex-start"}>
            <HStack justify={"space-between"} align={"center"} w={"100%"} _hover={{ bg: "#fff", color: "var(--primary)" }} p={"2px 4px 2px 16px"} rounded={4}>
                <HStack gap={1}>
                    <Text>dogstarcoin</Text>
                    <Icon fontSize={"18px"} pt={"6px"}>{icons.down}</Icon>
                </HStack>
                <Icon fontSize={"20px"} pt={"4px"}>{icons.edit}</Icon>
            </HStack>
            <VStack w={"100%"}>
                <HStack w={"100%"} p={"2px 8px"} _hover={{ bg: "#fff", color: "var(--primary)" }} gap={1} rounded={4}>
                    <Icon transform={"rotateY(180deg)"} fontSize={"20px"} pt={"4px"}>{icons.threads}</Icon>
                    <Text>Threads</Text>
                </HStack>
            </VStack>
            <VStack w={"100%"} gap={1}>
                <HStack w={"100%"} gap={1} p={"2px 8px"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4}>
                    <Icon fontSize={"20px"} pt={"6px"}>{icons.down}</Icon>
                    <Text>Channels</Text>
                </HStack>
                <VStack w={"100%"} p={"2px 8px"}>

                </VStack>
                <HStack w={"100%"} p={"2px 8px"} gap={1} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} onClick={handleShowCreateModal}>
                    <Icon fontSize={"20px"} pt={"4px"}>{icons.plus}</Icon>
                    <Text>Add Channels</Text>
                </HStack>
            </VStack>
            <VStack w={"100%"} gap={1}>
                <HStack w={"100%"} gap={1} p={"2px 8px"} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4} onClick={handleShowCreateDMModal}>
                    <Icon fontSize={"20px"} pt={"6px"}>{icons.down}</Icon>
                    <Text>Direct Messages</Text>
                </HStack>
                <VStack w={"100%"} p={"2px 8px"}>

                </VStack>
                <HStack w={"100%"} p={"2px 8px"} gap={1} _hover={{ bg: "#fff", color: "var(--primary)" }} rounded={4}>
                    <Icon fontSize={"20px"} pt={"4px"}>{icons.plus}</Icon>
                    <Text>Invite People</Text>
                </HStack>
            </VStack>
        </VStack>
        {showDMModal && <CreateDM open={showDMModal} setOpen={setShowDMModal} />}
        {showCreateModal && <CreateChannel open={showCreateModal} setOpen={setShowCreateModal} />}
    </VStack>
}

export default SideBar;
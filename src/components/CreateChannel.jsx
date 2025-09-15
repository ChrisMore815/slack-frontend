import { useContext, useEffect, useState } from "react";
import { Input, VStack, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, ModalOverlay, Button, HStack, Checkbox, Text } from "@chakra-ui/react";
import propTypes from 'prop-types'
import useUsers from "../hooks/useUsers";
import { AuthContext } from "../contexts/AuthProvider";
import BadgeAvatar from './BadgeAvatar'
import { SocketContext } from '../contexts/SocketProvider'
import socketEvents from "../constants/socketEvents";
import icons from "../constants/icons";

const CreateChannel = (props) => {
    const { users } = useUsers();
    const { auth } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);

    const [curC, setCurC] = useState({
        name: "",
        creator: "",
        members: [],
    })

    useEffect(() => {
        if (auth?._id)
            setCurC({ ...curC, creator: auth._id })
    }, [auth])

    const handleChange = (e) => {
        setCurC({ ...curC, name: e.target.value })
    }

    const handleSelect = (member) => {
        setCurC({ ...curC, members: curC.members.includes(member) ? curC.members.filter((curMember) => curMember !== member) : [...curC.members, member] })
    }

    const handleOk = () => {
        const data = { ...curC, members: curC.members.includes(auth._id) ? curC : [...curC.members, auth._id] }
        socket.emit(socketEvents.CREATECHANNEL, data)
        handleClose();
    }

    const handleClose = () => {
        props.setOpen(!open)
    }

    return <Modal isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent bg={"var(--primary)"} color={"#FFF"}>
            <ModalHeader>
                Create Channel
            </ModalHeader>
            <ModalBody>
                <Input
                    p={"4px 8px"}
                    _focus={{ border: "1px solid #fff6" }}
                    placeholder={"Insert ChannelName Ex: myChannel"}
                    _placeholder={{ fontStyle: "italic", color: "#fff6" }}
                    onChange={handleChange}
                />
                <VStack maxH={"500px"} minH={"400px"} overflowY={"auto"} p={4} gap={2}>
                    {
                        users.map((user, index) => {
                            if (user._id !== auth._id) {
                                return <Checkbox
                                    py={1}
                                    px={4}
                                    w={"100%"}
                                    key={index}
                                    rounded={8}
                                    _hover={{ bg: "#5c275cff", }}
                                    onChange={() => handleSelect(user._id)}
                                    bg={curC.members.includes(user._id) ? "#5c275cff" : "none"}
                                >
                                    <HStack w={"100%"} px={8} gap={2} justify={"space-between"}>
                                        <HStack>
                                            <BadgeAvatar status={user.status} src={"default.gif"} />
                                            <Text>{user.username}</Text>
                                        </HStack> 
                                    </HStack>
                                </Checkbox>
                            }
                        })
                    }
                </VStack>
            </ModalBody>
            <ModalFooter gap={8} color={"var(--primary)"}>
                <Button onClick={handleOk}>Ok</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

CreateChannel.PropsTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default CreateChannel;
import React, { useContext, useEffect, useState } from "react";
import { Modal, ModalOverlay, ModalHeader, ModalContent, ModalBody, Text, VStack, HStack, Checkbox, ModalFooter, Button } from '@chakra-ui/react'
import propTypes from 'prop-types';
import BadgeAvatar from "./BadgeAvatar";
import useUsers from "../hooks/useUsers";
import { AuthContext } from "../contexts/AuthProvider";
import { SocketContext } from "../contexts/SocketProvider";
import socketEvents from "../constants/socketEvents";

const CreateDM = (props) => {

    const { auth } = useContext(AuthContext);
    const { allUsers, socket } = useContext(SocketContext);

    const [curD, setCurD] = useState({
        creator: "",
        members: [],
        name: Date.now(),
    })

    useEffect(() => {
        if (auth._id) setCurD({ ...curD, creator: auth._id })
    }, [auth])

    const handleChange = (member) => {
        setCurD({ ...curD, members: curD.members.includes(member) ? curD.members.filter((curMember) => curMember != member) : [...curD.members, member] })
    }

    const handleOk = () => {
        curD.members.forEach((member) => {
            const data = { ...curD, members: [member, auth._id], isDm: true };
            socket.emit(socketEvents.CREATECHANNEL, data);
        })

        handleClose();
    }

    const handleClose = () => {
        props.setOpen(!props.open);
    }

    return <Modal isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent bg={"var(--primary)"} color={"#FFF"}>
            {/* <ModalCloseButton /> */}
            <ModalHeader>
                Invite People
            </ModalHeader>
            <ModalBody>
                <VStack h={"400px"} overflowY={"auto"} p={4} gap={2}>
                    {allUsers &&
                        allUsers.map((user, index) => {
                            if (user._id !== auth._id) {
                                return <Checkbox
                                    py={1}
                                    px={4}
                                    w={"100%"}
                                    rounded={8}
                                    key={index}
                                    _hover={{ bg: "#5c275cff", }}
                                    onChange={() => handleChange(user._id)}
                                    bg={curD.members.includes(user._id) ? "#5c275cff" : "none"}
                                >
                                    <HStack w={"100%"} px={8} gap={2}>
                                        <BadgeAvatar status={user.status} src={"default.gif"} />
                                        <Text>{user.username}</Text>
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

CreateDM.propTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default CreateDM;
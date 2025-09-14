import { Input, VStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, Button } from "@chakra-ui/react";
import propTypes from 'prop-types'

const CreateChannel = (props) => {
    return <Modal isOpen={props.open} isCentered>
        <ModalOverlay />
        <ModalContent>
            {/* <ModalCloseButton /> */}
            <ModalHeader>
                Create Channel
            </ModalHeader>
            <ModalBody>
                <Input
                    p={"4px 8px"}
                    _focus={{ border: "1px solid #0006" }}
                    placeholder={"Insert ChannelName Ex: myChannel"}
                    _placeholder={{ fontStyle: "italic", color: "#0006" }}
                />
                <VStack maxH={"400px"} overflowY={"auto"}>
                    
                </VStack>
            </ModalBody>
            <ModalFooter gap={8}>
                <Button>Ok</Button>
                <Button>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}









































CreateChannel.PropsTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default CreateChannel;
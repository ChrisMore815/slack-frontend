import { Modal } from "@chakra-ui/react";
import propTypes from 'prop-types'

const CreateChannel = (props) => {
    return <Modal isOpen={props.open}>

    </Modal>
}

CreateChannel.PropsTypes = {
    open: propTypes.bool.isRequired,
    setOpen: propTypes.func.isRequired
}

export default CreateChannel;
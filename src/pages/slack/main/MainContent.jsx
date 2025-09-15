import { VStack } from "@chakra-ui/react";
import propTypes from 'prop-types';
import MessageView from "../../../components/MessageView";

const MainContent = (props) => {
    const { msg, handleDelete, handleEdit, handlePin, handleEmoticon, handleThread } = props;

    return <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
        {
            msg.length && msg.map((msg, index) => {
                return <MessageView key={index} src={"default.gif"}
                    msg={msg}
                    handlePin={handlePin}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleEmoticon={handleEmoticon}
                    handleThread={handleThread}
                />
            })
        }
    </VStack>
}



























MainContent.propTypes = {
    msg: propTypes.array.isRequired,
    handlePin: propTypes.func.isRequired,
    handleEdit: propTypes.func.isRequired,
    handleDelete: propTypes.func.isRequired
}

export default MainContent;
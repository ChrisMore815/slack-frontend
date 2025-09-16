import { VStack } from "@chakra-ui/react";
import propTypes from 'prop-types';
import MessageView from "../../../components/MessageView";
import { useContext } from "react";
import { SocketContext } from "../../../contexts/SocketProvider";

const MainContent = (props) => {
    const { msg, handleDelete, handleEdit, handlePin, handleEmoticon } = props;

    const { allUsers } = useContext(SocketContext)

    return <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
        {
            msg.length && msg.map((msg, index) => {
                const curUser = allUsers.filter((user) => user._id === msg.sender)[0];
                // console.log(curUser)
                return <MessageView
                    msg={msg}
                    key={index}
                    curUser={curUser}
                    handlePin={handlePin}
                    handleEdit={handleEdit}
                    // src={curUser.avatar}
                    handleDelete={handleDelete}
                    handleEmoticon={handleEmoticon}
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
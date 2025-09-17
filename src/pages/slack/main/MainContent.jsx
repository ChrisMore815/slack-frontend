import { useContext } from "react";
import propTypes from "prop-types";

import { VStack } from "@chakra-ui/react";

import MessageView from "src/components/MessageView";
import { SocketContext } from "src/contexts/SocketProvider";

const MainContent = (props) => {
    const { msg, status } = props;

    const { allUsers } = useContext(SocketContext);

    return (
        <VStack w={"100%"} flex={"1 1 0"} overflowY={"auto"} gap={2} p={4}>
            {status == "Messages" ? (
                msg.length &&
                msg.map((msg, index) => {
                    const curUser = allUsers?.filter((user) => user._id === msg.sender)[0];
                    return <MessageView msg={msg} key={index} curUser={curUser} />;
                })
            ) : (
                <></>
            )}
        </VStack>
    );
};

MainContent.propTypes = {
    msg: propTypes.array.isRequired,
    status: propTypes.string.isRequired,
};

export default MainContent;

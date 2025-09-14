import { VStack } from "@chakra-ui/react";
import MessageView from "../../../components/MessageView";

const MainContent = () => {
    return <VStack w={"100%"} flex={"1 1 0"} gap={2} p={4}>
        <MessageView src={"default.gif"} />
    </VStack>
}

export default MainContent;
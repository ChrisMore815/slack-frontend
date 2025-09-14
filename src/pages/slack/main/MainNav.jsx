import { HStack, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import icons from "../../../constants/icons";

const navConstants = [
    { displayText: "Messages", icon: icons.threads },
    // { displayText: "Add Canvas", icon: icons.threads },
    { displayText: "Files", icon: icons.file },
    { displayText: "Pin", icon: icons.pinned },
]

const MainNav = () => {

    const [status, setStatus] = useState('Messages')

    const handleSelect = (state) => {
        setStatus(state);
    }

    return <HStack w={"100%"} h={"40px"} p={2} color={"#000"} fontSize={"20px"} gap={4} align={"center"}>
        {
            navConstants.map((item, index) => {
                return <HStack key={index} w={"fit-content"} gap={1} align={"center"} cursor={"pointer"} borderBottom={status == item.displayText ? "2px solid black" : "none"} onClick={() => handleSelect(item.displayText)}>
                    <Icon pt={1}>{item.icon}</Icon>
                    <Text>{item.displayText}</Text>
                </HStack>
            })
        }
    </HStack>
}

export default MainNav
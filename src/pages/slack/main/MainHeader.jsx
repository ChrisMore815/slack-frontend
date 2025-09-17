import React, { useContext } from "react";
import propTypes from "prop-types";

import { HStack, Text, Icon, Box, Image } from "@chakra-ui/react";
import icons from "src/constants/icons";

import { serverUrl } from "src/constants/serverUrl";
import { AuthContext } from "src/contexts/AuthProvider";

const MainHeader = (props) => {
    const { auth } = useContext(AuthContext);
    props.data &&
        (props.data.isDm === false ? props.data.name : props.data.members && props.data.members?.filter((v) => v._id !== auth._id));
    return (
        <HStack w={"100%"} h={"60px"} p={4} justify={"space-between"} color={"#000"}>
            <HStack fontWeight={"bold"} gap={1}>
                <Text>#</Text>
                <Text>{typeof name === "string" ? name : typeof name == "object" && name[0]?.username}</Text>
            </HStack>
            <HStack gap={4} align={"center"}>
                <HStack w={"60px"} justify={"space-between"} h={"24px"}>
                    <Box pos={"relative"} w={"48px"} h={"100%"} border={"0.3px solid #0008"}>
                        {props.data.members &&
                            props.data.members.map((member, index) => {
                                if (index < 2) {
                                    return (
                                        <Image
                                            top={0}
                                            w={"24px"}
                                            h={"24px"}
                                            rounded={8}
                                            key={index}
                                            pos={"absolute"}
                                            left={index * 5}
                                            src={`${serverUrl}/avatar/${member.avatar ? member.avatar : "default.gif"}`}
                                        />
                                    );
                                }
                            })}
                    </Box>
                    <Text>{props.data.members && props.data.members.length}</Text>
                </HStack>
                <Icon fontSize={"20px"} pt={0.5} cursor={"pointer"}>
                    {icons.earphone}
                </Icon>
                <Icon fontSize={"20px"} pt={0.5} cursor={"pointer"}>
                    {icons.more}
                </Icon>
            </HStack>
        </HStack>
    );
};

MainHeader.propTypes = {
    data: propTypes.object.isRequired,
};

export default MainHeader;

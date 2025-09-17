import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { HStack, VStack, Input, Text, Button, Icon /* , Avatar */ } from "@chakra-ui/react";
import icons from ".src/.src/constants/icons";

import { AuthContext } from ".src/.src/contexts/AuthProvider";

const SignUp = () => {
    const { signup } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    // const [file, setFile] = useState();
    const [data, setData] = useState({
        messageInfo: {
            email: "",
            avatar: "",
            password: "",
            username: "",
            status: -1,
        },
        confirm: "",
    });

    const handleChange = (e) => {
        /* if (e.target.name === 'avatar') {
            setFile(e.target.files[0])
        } else */
        if (e.target.name === "confirm") {
            setData({ ...data, confirm: e.target.value });
        } else {
            setData({ ...data, messageInfo: { ...data.messageInfo, [e.target.name]: e.target.value } });
        }
    };

    const handleShowPassword = () => {
        setShow(!show);
    };

    const handleSignUp = () => {
        // const formData = new FormData();
        // formData.append("file", file)
        // for (const key in data.messageInfo) {
        //     formData.append(key, data.messageInfo[key])
        // }
        // signup(formData);
        signup(data.messageInfo);
    };

    return (
        <VStack w={"100%"} h={"100vh"} justify={"center"} align={"center"} gap={6} bg={"var(--primary)"} color={"white"}>
            {/* <Avatar size="xl" src={`${serverUrl}/avatar/${data.messageInfo.avatar ? data.messageInfo.avatar : "default.gif"}`} />
        <Input type="file" onChange={handleChange} hidden /> */}
            <Text fontSize={"45px"} fontWeight={"bold"}>
                SignUp
            </Text>
            <VStack w={"100%"} gap={4}>
                <HStack
                    pos={"relative"}
                    justify={"center"}
                    align={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        _focus={{ border: "1px solid #fff" }}
                        placeholder={"ChrisMore"}
                        _placeholder={{ color: "#fff8" }}
                        onChange={handleChange}
                        type="text"
                        name="username"
                        value={data.messageInfo.username ? data.messageInfo.username : ""}
                        pr={"32px"}
                    />
                    <Icon fontSize={"20px"} pos={"absolute"} right={2}>
                        {icons.user}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    justify={"center"}
                    align={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        _focus={{ border: "1px solid #fff" }}
                        placeholder={"chrismore@gmail.com"}
                        _placeholder={{ color: "#fff8" }}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        value={data.messageInfo.email ? data.messageInfo.email : ""}
                        pr={"32px"}
                    />
                    <Icon fontSize={"20px"} pos={"absolute"} right={2}>
                        {icons.user}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    justify={"center"}
                    align={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        _focus={{ border: "1px solid #fff" }}
                        placeholder={"Your Password Here..."}
                        _placeholder={{ color: "#fff8" }}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        name="password"
                        value={data.messageInfo.password ? data.messageInfo.password : ""}
                        pr={"32px"}
                    />
                    <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} zIndex={"10"}>
                        {show ? icons.showPassword : icons.password}
                    </Icon>
                </HStack>
                <HStack
                    pos={"relative"}
                    justify={"center"}
                    align={"center"}
                    w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                >
                    <Input
                        _focus={{ border: "1px solid #fff" }}
                        placeholder={"Your Confirm Here..."}
                        _placeholder={{ color: "#fff8" }}
                        onChange={handleChange}
                        type={show ? "text" : "password"}
                        name="confirm"
                        value={data.confirm ? data.confirm : ""}
                        pr={"32px"}
                    />
                    <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} z={"10"}>
                        {show ? icons.showPassword : icons.password}
                    </Icon>
                </HStack>
            </VStack>
            <Button
                onClick={handleSignUp}
                p={"8px 40px"}
                w={{ base: "350px", md: "60%", sm: "80%", lg: "40%", xl: "450px" }}
                color={"var(--primary)"}
            >
                SignUp
            </Button>
            <HStack w={{ base: "300px", md: "50%", sm: "70%", lg: "30%", xl: "400px" }} justify={"space-between"}>
                <Text>Have already account?</Text>
                <Link to={"/"}>SignUp</Link>
            </HStack>
        </VStack>
    );
};

export default SignUp;

import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import { HStack, VStack, Box, Input, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/AuthProvider";
import icons from "../../constants/icons";

const SignIn = () => {
    const { signin } = useContext(AuthContext);

    const [show, setShow] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => {
        setShow(!show);
    }

    const handleSignIn = () => {
        signin(data);
    }

    return <VStack w={"100%"} h={"100vh"} justify={"center"} align={"center"} gap={10} bg={"var(--primary)"} color={"white"}>
        <Text fontSize={"45px"} fontWeight={"bold"}>SignIn</Text>
        <VStack w={"100%"} gap={4}>
            <HStack pos={"relative"} justify={"center"} align={"center"} w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }}>
                <Input _focus={{border: "1px solid #fff"}} onChange={handleChange} type="text" name="email" value={data.email ? data.email : ""} pr={"32px"} placeholder={"chrismore@gmail.com"} _placeholder={{color: "#fff8"}} />
                <Icon fontSize={"20px"} pos={"absolute"} right={2}>{icons.user}</Icon>
            </HStack>
            <HStack pos={"relative"} justify={"center"} align={"center"} w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }}>
                <Input _focus={{border: "1px solid #fff"}} onChange={handleChange} type={show ? "text" : 'password'} name="password" value={data.password ? data.password : ""} pr={"32px"} placeholder={"Your Password Here..."} _placeholder={{color:"#fff8"}} />
                <Icon cursor={"pointer"} fontSize={"20px"} pos={"absolute"} right={2} onClick={handleShowPassword} zIndex={"10"}>{show ? icons.showPassword : icons.password}</Icon>
            </HStack>
        </VStack>
        <HStack w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }} justify={"space-between"}>
            <Checkbox >Remember Me</Checkbox>
            <Box>Don't you have any account? <Link to={"/auth/signup"}>SignUp</Link></Box>
        </HStack>
        <Button onClick={handleSignIn} p={"8px 40px"} w={{ base: "350px", md: "60%", sm: "80%", lg: "50%", xl: "450px" }} color={"var(--primary)"}>SignIn</Button>
    </VStack>
}

export default SignIn;
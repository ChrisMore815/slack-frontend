import React, { useContext, useState } from "react";

import { HStack, VStack, Box, Input, Text, Checkbox, Button, Icon } from "@chakra-ui/react";
import { AuthContext } from "../../contexts/AuthProvider";

const SignIn = () => {

    const { signin } = useContext(AuthContext);

    const [data, setData] = useState({
        userInfo: {
            name: "",
            email: "",
            password: "",
        },
        confirm: "",
    })

    const handleChange = (e) => {
        if (e.target.name == "confirm") {
            setData({ ...data, confirm: e.target.value })
        } else {
            setData({ ...data, userInfo: { ...data.userInfo, [e.target.name]: e.target.value } })
        }
    }

    const handleSignIn = () => {
        signin(data.userInfo);
    }

    return <VStack w={"100%"} h={"100%"}>
        <Input onChange={handleChange} type="text" name="name" value={data.userInfo.name ? data.userInfo.name : ""} />
        <Input onChange={handleChange} type="email" name="name" value={data.userInfo.email ? data.userInfo.email : ""} />
        <Input onChange={handleChange} type="password" name="name" value={data.userInfo.password ? data.userInfo.password : ""} />
        <Input onChange={handleChange} type="password" name="name" value={data.confirm ? data.confirm : ""} />
        <Button onClick={handleSignIn}>SignIn</Button>
    </VStack>
}

export default SignIn;
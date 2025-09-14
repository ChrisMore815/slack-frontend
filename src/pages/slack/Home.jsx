import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import SideBar from "./sidebar/SideBar";
import Main from './main/Main'
import useUsers from '../../hooks/useUsers'

const Home = () => {
    const {users} = useUsers();
    console.log(users);
    return <HStack color={"#fff"} w={"100%"} h={"100%"}>
        <SideBar />
        <Main />
    </HStack>
}

export default Home;
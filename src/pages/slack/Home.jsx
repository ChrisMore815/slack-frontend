import { useContext, useEffect } from "react";
import { HStack } from "@chakra-ui/react";

import Main from './main/Main'
import SideBar from "./sidebar/SideBar";
import { AuthContext } from "../../contexts/AuthProvider";
import Thread from "../../components/Thread";
import { SocketContext } from "../../contexts/SocketProvider";



const Home = () => {
    const { token, logOut } = useContext(AuthContext)
    const { showThread } = useContext(SocketContext)

    useEffect(() => {
        if (!localStorage.getItem("token")) logOut()
    }, [token])

    return <HStack color={"#fff"} w={"100%"} flex={"1 1 0"}>
        <SideBar />
        <Main />
        {showThread && <Thread />}
    </HStack>
}

export default Home;
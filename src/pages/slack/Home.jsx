import { HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import Main from './main/Main'
import useUsers from '../../hooks/useUsers'
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";



const Home = () => {
    const router = useNavigate();
    const { users } = useUsers();
    const { token, logOut } = useContext(AuthContext)

    useEffect(() => {
        if (!localStorage.getItem("token")) logOut()
    }, [token])

    return <HStack color={"#fff"} w={"100%"} h={"100%"}>
        <SideBar />
        <Main />
    </HStack>
}

export default Home;
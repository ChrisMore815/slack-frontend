import { HStack, VStack } from '@chakra-ui/react'
import SideNav from './SideNav';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <HStack w={"100%"} h={"100vh"} bg={"var(--primary)"} p={"0px 5px 2px 0px"}>
            <SideNav />
            <VStack w={"full"} h={"100%"} justify={"flex-start"}>
                <Header />
                <Outlet />
            </VStack>
        </HStack>
    )
}

export default MainLayout;
import React from 'react';
import { HStack, VStack } from '@chakra-ui/react'
import SideNav from './SideNav';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <HStack w={"100%"} h={"100vh"} bg={"var(--primary)"}>
            <SideNav />
            <VStack w={"full"} h={"100%"} justify={"flex-start"}>
                <Header />
                <Outlet />
            </VStack>
        </HStack>
    )
}

export default MainLayout;
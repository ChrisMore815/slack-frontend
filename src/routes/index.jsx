import React, { Children } from "react";

import { useRoutes } from "react-router-dom";

import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp'
import Icons from "../pages/icon/Icons";

const appRoutes = [
    {
        path: '/', children: [
            { path: '/', element: <SignIn /> },
            { path: "/auth/signup", element: <SignUp /> }
        ]
    },
    { path: '/service/icons', element: <Icons /> }
]

const AppRoutes = () => {
    return useRoutes(appRoutes);
}

export default AppRoutes;
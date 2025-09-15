import React from "react";

const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));

const Auth = {
    SignIn,
    SignUp
}

export default Auth;
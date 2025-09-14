import React, { createContext, useContext, useMemo } from "react";
import propTypes from 'prop-types';
import { io } from "socket.io-client";
import { AuthContext } from './AuthProvider';
import {serverUrl} from '../constants/serverUrl'

export const SocketContext = createContext();

const SocketProvider = (props) => {
    const { auth, token } = useContext(AuthContext);
    useMemo(() =>auth?._id && io(`${serverUrl}`, { extraHeaders: { token } }), [auth]);

    return <SocketContext.Provider value={{}}>
        {props.children}
    </SocketContext.Provider>
}


























SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
import React, { createContext, useContext, useEffect, useMemo } from "react";
import propTypes from 'prop-types';
import { io } from "socket.io-client";
import { AuthContext } from './AuthProvider';
import { serverUrl } from '../constants/serverUrl'
import useUsers from '../hooks/useUsers'
import socketEvents, { status } from '../constants/socketEvents'

export const SocketContext = createContext();

const SocketProvider = (props) => {
    const { users } = useUsers();

    const { auth, setAuth } = useContext(AuthContext);
    const socket = useMemo(() => auth?._id && io(`${serverUrl}`, { extraHeaders: { token: localStorage.getItem('token') } }), [auth]);

    useEffect(() => {
        if (socket) {
            socket.on(socketEvents.CHANGESTATUS, (state, data) => {
                if (state == status.ON) {
                    setAuth(data)
                }
                // console.log(status, data)
            })
        }
        return () => {
            if (socket) {
                socket.removeListener(socketEvents.CHANGESTATUS)
            }
        }
    })

    useEffect(() => {
        if (auth._id) {
            socket.emit(socketEvents.CHANGESTATUS, { id: auth._id, status: 1})
        }
    }, [auth._id])

    return <SocketContext.Provider value={{ socket }}>
        {props.children}
    </SocketContext.Provider>
}


























SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import propTypes from 'prop-types';
import { io } from "socket.io-client";
import { AuthContext } from './AuthProvider';
import { serverUrl } from '../constants/serverUrl'
import useUsers from '../hooks/useUsers'
import socketEvents, { status } from '../constants/socketEvents'

export const SocketContext = createContext();

const SocketProvider = (props) => {
    const { auth, setAuth } = useContext(AuthContext);
    const socket = useMemo(() => auth._id && io(`${serverUrl}`, { extraHeaders: { token: localStorage.getItem('token') } }), [auth._id]);

    const [allChannels, setAllChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState({});

    console.log(selectedChannel)

    useEffect(() => {
        if (socket) {
            socket.on(socketEvents.CHANGESTATUS, (state, data) => {
                if (state == status.ON) setAuth(data)
            })
            socket.on(socketEvents.READALLCHANNEL, (state, data) => {
                if (state === status.ON) setAllChannels(data)

            })
            socket.on(socketEvents.CREATECHANNEL, (state, data) => {
                if (state == status.ON) setAllChannels([...allChannels, data])
            })
            socket.on(socketEvents.READCHANNEL, (state, data) => {
                if (state == status.ON) setSelectedChannel(data)
            })
            socket.on(socketEvents.UPDATECHANNEL, (state, data) => {
                if (state === status.ON) setAllChannels(allChannels.map((channel) => channel._id === data._id ? data : channel))
            })
        }
        return () => {
            if (socket) {
                socket.removeListener(socketEvents.CHANGESTATUS)
                socket.removeListener(socketEvents.READALLCHANNEL)
                socket.removeListener(socketEvents.CREATECHANNEL)
            }
        }
    })

    useEffect(() => {
        if (auth._id) {
            socket.emit(socketEvents.CHANGESTATUS, { id: auth._id, status: 1 });
            socket.emit(socketEvents.READALLCHANNEL);
        }
    }, [auth._id])

    return <SocketContext.Provider value={{ socket, allChannels, selectedChannel }}>
        {props.children}
    </SocketContext.Provider>
}

SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
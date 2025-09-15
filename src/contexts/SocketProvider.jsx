import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import propTypes from 'prop-types';
import { io } from "socket.io-client";
import { AuthContext } from './AuthProvider';
import { serverUrl } from '../constants/serverUrl'
import useUsers from '../hooks/useUsers'
import socketEvents, { status } from '../constants/socketEvents'
import api from "../libs/axios";

export const SocketContext = createContext();

const SocketProvider = (props) => {
    // const { users } = useUsers()
    const { auth, setAuth, token } = useContext(AuthContext);
    const socket = useMemo(() => auth._id && io(`${serverUrl}`, { extraHeaders: { token: localStorage.getItem('token') } }), [auth._id]);

    const [allDms, setAllDms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allChannels, setAllChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState({});

    // useEffect(() => {
    //     console.log(auth._id)
    //     auth._id && setAllUsers(users)
    // }, [auth._id])

    useEffect(() => {
        if (socket) {
            socket.on(socketEvents.CHANGESTATUS, (state, data) => {
                if (state == status.ON) {
                    if (data._id == auth._id) setAuth(data)
                    api.get('/user').then((res) => { setAllUsers(res.data) }).catch((err) => { console.log(err) })
                }
            })
            socket.on(socketEvents.READALLCHANNEL, (state, data) => {
                let tmp_channels = [];
                let tmp_dms = [];
                if (state == status.ON) {
                    data.forEach((curChannel) => {
                        if (curChannel.isDm == false) {
                            tmp_channels.push(curChannel);
                        } else {
                            tmp_dms.push(curChannel)
                        }
                    })
                }
                setAllChannels(tmp_channels)
                setAllDms(tmp_dms)
            })
            socket.on(socketEvents.CREATECHANNEL, (state, data) => {
                if (state == status.ON) {
                    socket.emit(socketEvents.READALLCHANNEL);
                };
            })
            socket.on(socketEvents.READCHANNEL, (state, data) => {
                if (state == status.ON) setSelectedChannel(data);
            })
            socket.on(socketEvents.UPDATECHANNEL, (state, data) => {
                if (state === status.ON) {
                    // setAllChannels(allChannels.map((channel) => channel._id == data._id ? data : channel))
                    socket.emit(socketEvents.READALLCHANNEL);
                };
            })
            socket.on(socketEvents.DELETECHANNEL, (state) => {
                if (state === status.ON) {
                    socket.emit(socketEvents.READALLCHANNEL);
                };
            })
        }
        return () => {
            if (socket) {
                socket.removeListener(socketEvents.CHANGESTATUS);

                socket.removeListener(socketEvents.READALLCHANNEL);
                socket.removeListener(socketEvents.CREATECHANNEL);
                socket.removeListener(socketEvents.READCHANNEL);
                socket.removeListener(socketEvents.UPDATECHANNEL);
                socket.removeListener(socketEvents.DELETECHANNEL);
            }
        }
    })

    useEffect(() => {
        if (auth._id) {
            socket.emit(socketEvents.CHANGESTATUS, { id: auth._id, status: 1 });
            socket.emit(socketEvents.READALLCHANNEL);
        }
    }, [auth._id])

    return <SocketContext.Provider value={{ socket, allChannels, selectedChannel, allUsers, allDms }}>
        {props.children}
    </SocketContext.Provider>
}

SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
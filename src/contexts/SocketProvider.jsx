import { createContext, useContext, useEffect, useMemo, useState } from "react";
import propTypes from 'prop-types';
import { io } from "socket.io-client";

import api from "../libs/axios";
import { AuthContext } from './AuthProvider';
import { serverUrl } from '../constants/serverUrl'
import socketEvents, { status } from '../constants/socketEvents'

export const SocketContext = createContext();

const SocketProvider = (props) => {
    // const { users } = useUsers()
    const { auth, setAuth } = useContext(AuthContext);
    const socket = useMemo(() => auth._id && io(`${serverUrl}`, { extraHeaders: { token: localStorage.getItem('token') } }), [auth._id]);

    const [allDms, setAllDms] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allChannels, setAllChannels] = useState([]);
    const [selectedChMsg, setSelectedChMsg] = useState([]);
    const [selectedCurChannel, setSelectedCurChannel] = useState({});

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
                if (state == status.ON) socket.emit(socketEvents.READALLCHANNEL);

            })
            socket.on(socketEvents.READCHANNEL, (state, data) => {
                if (state == status.ON) {
                    setSelectedChMsg(data.msg);
                    setSelectedCurChannel(data.ch);
                };
            })
            socket.on(socketEvents.UPDATECHANNEL, (state, data) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);

            })
            socket.on(socketEvents.DELETECHANNEL, (state) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);
            })

            socket.on(socketEvents.CREATEMESSAGE, (state, data) => {
                if (state == status.ON) setSelectedChMsg(data)
            })
            socket.on(socketEvents.UPDATEMESSAGE, (state, data) => {
                if (state === status.ON) setSelectedChMsg(data)
            })
            socket.on(socketEvents.DELETEMESSAGE, (state, data) => {
                if(state === status.ON) setSelectedChMsg(data)
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

                socket.removeListener(socketEvents.CREATEMESSAGE);
                socket.removeListener(socketEvents.UPDATEMESSAGE);
            }
        }
    })

    useEffect(() => {
        if (auth._id) {
            socket.emit(socketEvents.CHANGESTATUS, { id: auth._id, status: 1 });
            socket.emit(socketEvents.READALLCHANNEL);
        }
    }, [auth._id])

    useEffect(() => {
        if (allChannels.length > 0) socket.emit(socketEvents.READCHANNEL, allChannels[0])
    }, [allChannels])

    return <SocketContext.Provider value={{ socket, allChannels, selectedCurChannel, allUsers, allDms, selectedChMsg }}>
        {props.children}
    </SocketContext.Provider>
}

SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
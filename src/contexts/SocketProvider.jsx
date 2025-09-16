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
    const [showThread, setShowThread] = useState("");
    const [allChannels, setAllChannels] = useState([]);
    const [selectedChMsg, setSelectedChMsg] = useState([]);
    const [selectedCurChannel, setSelectedCurChannel] = useState({});
    const [userInfo, setUserInfo] = useState({
        sender: null,
        channelId: null,
        receivers: [],
        message: "",
        files: [],
        emoticons: [],
        isPinned: false,
        parentId: null
    });


    useEffect(() => {
        if (socket) {
            socket.on(socketEvents.CHANGESTATUS, (state, data) => {
                if (state == status.ON) {
                    if (data._id == auth._id) setAuth(data)
                    api.get('/user').then((res) => { setAllUsers(res.data) }).catch((err) => { console.log(err) })
                }
            })

            // Channel
            socket.on(socketEvents.READALLCHANNEL, (state, data) => {
                let tmp_channels = [];
                let tmp_dms = [];
                if (state == status.ON) {
                    console.log(data)
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
                if (state == status.ON) setSelectedCurChannel(data);
            })
            socket.on(socketEvents.UPDATECHANNEL, (state, data) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);

            })
            socket.on(socketEvents.DELETECHANNEL, (state) => {
                if (state === status.ON) socket.emit(socketEvents.READALLCHANNEL);
            })

            // Message
            socket.on(socketEvents.READALLMESSAGE, (state, data) => {
                console.log(data)
                if (state == status.ON) setSelectedChMsg(data);
            })
            socket.on(socketEvents.CREATEMESSAGE, (state, data) => {
                if (state == status.ON) setSelectedChMsg([...selectedChMsg, data]);
            })
            // socket.on(socketEvents.UPDATEMESSAGE, (state, data) => {
            //     if (state === status.ON) setSelectedChMsg(data)
            // })
            // socket.on(socketEvents.DELETEMESSAGE, (state, data) => {
            //     if (state === status.ON) setSelectedChMsg(data)
            // })
        }
        return () => {
            if (socket) {
                socket.removeListener(socketEvents.CHANGESTATUS);

                socket.removeListener(socketEvents.READALLCHANNEL);
                socket.removeListener(socketEvents.CREATECHANNEL);
                socket.removeListener(socketEvents.READCHANNEL);
                socket.removeListener(socketEvents.UPDATECHANNEL);
                socket.removeListener(socketEvents.DELETECHANNEL);

                socket.removeListener(socketEvents.READALLMESSAGE);
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

    useEffect(() => {
        if (selectedCurChannel._id) socket.emit(socketEvents.READALLMESSAGE, selectedCurChannel._id)
    }, [selectedCurChannel])

    return <SocketContext.Provider
        value={{
            allDms,
            socket,
            allUsers,
            userInfo,
            showThread,
            allChannels,
            setUserInfo,
            selectedChMsg,
            setShowThread,
            selectedCurChannel,
        }}
    >
        {props.children}
    </SocketContext.Provider>
}

SocketProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default SocketProvider
"use client";

import { useSocket } from '@/context/SocketProvider'
import React, { useCallback, useEffect, useState } from 'react'

const Room = ({id}) => {

    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    }, []);

    useEffect(() => {
        socket.on('user:joined', handleUserJoined);

        return () => {
            socket.off('user:joined', handleUserJoined)
        }
    }, [socket, handleUserJoined]);

    return (
        <div>
            Room No: {id}
            <h4>{remoteSocketId ? 'Connected' : 'No one in room'}</h4>
            {
                remoteSocketId && <button onClick={handleCallUser}>CALL</button>
            }
        </div>
    )
}

export default Room

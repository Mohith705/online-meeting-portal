"use client";

import { useSocket } from '@/context/SocketProvider';
import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Lobby = () => {

    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useRouter();

    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();
        socket.emit("room:join", { email, room });
    }, [email, room, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room } = data;
        navigate.push(`/room/${room}`); 
    }, [navigate]);

    useEffect(() => {
        socket.on('room:join', handleJoinRoom);
        return () => {
            socket.off('room:join', handleJoinRoom)
        }
    }, [socket, handleJoinRoom]);

    return (
        <div>
            <h1>Lobby</h1>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email ID</label>
                <input
                    type="email"
                    id="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border border-black'
                />
                <br />
                <label htmlFor="room">Room Number</label>
                <input
                    type="text"
                    id="room"
                    name='room'
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className='border border-black'
                />
                <br />
                <button>Join</button>
            </form>
        </div>
    )
}

export default Lobby

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

const app = express();
const io = new Server(PORT, {
    cors: true,
});

app.use(bodyParser.json());
app.use(cors());

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on(("connection"), (socket) => {
    console.log(`Socker Connected: `, socket.id);
    socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit('user:joined', { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit('room:join', data);
    })
})
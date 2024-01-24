import { Server, Socket } from "socket.io";
import getQuestions from "../websocket/getQuestions";
import user from "../websocket/user";
import lobby from "../websocket/lobby";

export default async function routeSocket(io: Server, socket: Socket) {
    await getQuestions(io, socket);
    await user(io, socket);
    await lobby(io, socket);

    socket.on('disconnect', () => {
        socket.send('Bye!');
        console.log(`User disconnected: ${socket.id}`);
    })
}
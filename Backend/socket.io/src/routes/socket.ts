import { Server, Socket } from "socket.io";
import getQuestions from "../websocket/getQuestions";
import user from "../websocket/user";
import lobby from "../websocket/lobby";

export default async function routeSocket(io: Server, socket: Socket) {
    await getQuestions(io, socket);
    await user(io, socket);
    await lobby(io, socket);

    socket.on('disconnect', () => {
        socket.off('getQuest', getQuestions);
        socket.off('user', user);
        socket.off('joinLobby', lobby);
        socket.send('Bye!');
    })
}
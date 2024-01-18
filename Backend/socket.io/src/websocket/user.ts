import { Server, Socket } from "socket.io";

export default async function user(io:Server, socket:Socket) {
    const user = {
        name: "",
        score: 0,
    };

    socket.on('user', message => {
        user.name = message.name;
        user.score += message.score;

        socket.emit('user', user);
    });
}
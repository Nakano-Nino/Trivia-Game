import { Server, Socket } from "socket.io";
import { lobbies } from "./lobby";

export default async function user(io:Server, socket:Socket) {
    
    socket.on('user', message => {
        const users = lobbies.room_1.users.map( user => {
            if (socket.id == user.id) {
                user.score += message.score;
            }
            return user;
        });

        lobbies.room_1.users = [...new Set(users)];

        socket.emit('user', lobbies.room_1.users);
    })
}
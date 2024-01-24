import { Server, Socket } from "socket.io";
import { lobbies } from "./lobby";

const userAnswer = [];

let room_id = "";
let users = [];
export default async function user(io:Server, socket:Socket) {
    
    socket.on('user', message => {
        const roomId = message.roomId;

        room_id = roomId;

        users = lobbies[roomId]?.users.map(user => {
            if (socket.id == user.id) {
                user.score += message.score;
            }
            return user;
        }).filter((object, index, self) => index === self.findIndex(obj => obj.name.toLowerCase() === object.name.toLowerCase()));

        io.to(room_id).emit('user', users);

        io.to(room_id).emit('finish', users);
    });

    socket.on('answer', message => {
        const { name, avatar, answer, roomId } = message;
        if ( !name || !avatar || !answer ) {
            socket.emit('answer', "Please provide name, avatar and answer");
            return;
        }

        let index =  userAnswer.findIndex(user => user.name == name);
        let botIndex = userAnswer.findIndex(bot => bot.name == 'bot-1' || bot.name == 'bot-2' || bot.name == 'bot-3');

        if (index < 0) {
            userAnswer.push({
                name,
                avatar,
                answer,
            });
        }

        if (botIndex < 0) {
            userAnswer.push({
                name: 'bot-1' || 'bot-2' || 'bot-3',
                avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                answer: 'X',
            });
        }
        
        index = userAnswer.findIndex(user => user.name == name);
        botIndex = userAnswer.findIndex(bot => bot.name == 'bot-1' || bot.name == 'bot-2' || bot.name == 'bot-3');

        const random = Math.random();

        userAnswer[botIndex].answer = random < 0.25 ? 'A' : random < 0.25 ? 'B' : random < 0.5 ? 'C' : 'D';
        userAnswer[index].answer = answer;

        io.to(roomId).emit('answer', userAnswer);
    })
}
import { Server, Socket } from "socket.io";
import { IQuest } from "../interface/IQuest";

export default function getQuest(io: Server, socket: Socket) {
    socket.on('checkAnswer', (message: IQuest & {userAnswer: string; name: string}) => {
        if (message.userAnswer !== message.answer) {
            socket.emit('checkAnswer', {
                isCorrect: false,
            });

            return;
        }

        socket.emit('checkAnswer', {
            isCorrect: true,
        });
    });
}
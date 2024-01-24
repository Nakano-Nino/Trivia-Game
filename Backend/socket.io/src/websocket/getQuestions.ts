import { Server, Socket } from "socket.io";
import { IQuest } from "../interface/IQuest";
import { lobbies } from "./lobby";

export default async function getQuestions(io: Server, socket:  Socket) {
    try {
        socket.on('getQuest', message => {
            const roomId = message.roomId;

            if (new Object(lobbies[roomId]).hasOwnProperty("isEmited") && !lobbies[roomId].isEmited) {
                lobbies[roomId].isEmited = true;
                lobbies[roomId].isFinished = false;
                const index = message.index;

                if (!lobbies[roomId].questions[index]) {
                    lobbies[roomId].isEmited = false;
                    lobbies[roomId].isFinished = true;
                    lobbies[roomId].questions = [];
                    io.to(roomId).emit('getQuest', false);
                    return;
                }

                const question: IQuest & { time: number } = { ...lobbies[roomId].questions[+index], time: 10};

                const interval =  setInterval(() => {
                    io.to(roomId).emit('getQuest', question);

                    if (question.time == 0) {
                        lobbies[roomId].isEmited = false;
                        clearInterval(interval);
                    }
                    question.time -= 1;
                }, 1000);
            }
        });
    } catch (error) {
        console.log(error.message);
        socket.emit("getQuest", "Failed to fetch questions");
    }
}
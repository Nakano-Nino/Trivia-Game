import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { IQuest } from "../interface/IQuest";
import { lobbies } from "./lobby";

export default async function getQuestions(io: Server, socket:  Socket) {
    try {
        socket.on('getQuest', message => {
            if (!lobbies.room_1.isEmited) {
                lobbies.room_1.isEmited = true;
                lobbies.room_1.isFinished = false;
                const index = message.index;
                console.log(lobbies.room_1.questions[+index]);

                if (message.index == lobbies.room_1.questions.length) {
                    lobbies.room_1.isEmited = false;
                    lobbies.room_1.isFinished = true;
                    lobbies.room_1.questions = []
                    io.to('room_1').emit('getQuest', false);
                    return;
                }

                const quest : IQuest = { ...lobbies.room_1.questions[+index], time: 5 };

                const interval = setInterval(() => {
                    io.to('room_1').emit('getQuest', quest);

                    if ( quest.time == 0 ) {
                        lobbies.room_1.isEmited = false;
                        clearInterval(interval);
                    }
                    quest.time -= 1;
                }, 1000)
            }
        });
    } catch (error) {
        console.log(error.message);
        socket.emit("getQuest", "Failed to fetch questions");
    }
}
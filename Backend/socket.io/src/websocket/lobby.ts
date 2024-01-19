import { Server, Socket } from "socket.io";
import { IQuest } from "../interface/IQuest";
import { API } from "../lib/API";

const fetchQuestions = async () => {
    const res = await API.get("/api/v1/get-questions", {
        headers: { "ngrok-skip-browser-warning": "true" },
    });

    if (res.data.code === 200) {
        const allQuestions: IQuest[] = res.data.data;
        const uniqueQuestions =  Array.from(new Set(allQuestions.map(question => question.id)));
        const randomUniqueQuestions = shuffleArray(uniqueQuestions).slice(0, 5);
        const selectedQuestions = allQuestions.filter(question => randomUniqueQuestions.includes(question.id));

        return selectedQuestions;
    }
    return [];
};

function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const lobbies = {
    room_1: {
        questions: [],
        users: [],
        isEmited: false,
        isFinished: true,
        timeout: 10
    },
};

export default async function lobby(io: Server, socket: Socket) {
    socket.on("joinLobby", async message => {
        if (lobbies["room_1"].questions.length == 0) {
            lobbies["room_1"].questions = (await fetchQuestions());
        }
        
        if(!message.name || !message.avatar) {
            socket.emit('joinLobby', {
                message: "Please provide name and avatar"
            })
            return;
        }

        lobbies.room_1.users.push({
            name: message.name,
            avatar: message.avatar,
            id: socket.id,
            score: 0
        });

        socket.join("room_1");
        const interval = setInterval(() => {
            if (lobbies.room_1.timeout < 0) {
                clearInterval(interval);
                return;
            }

            if (lobbies.room_1.timeout <= 3) {
                if (lobbies.room_1.users.length < 4) {
                    lobbies.room_1.users.push({
                        name: `bot-${lobbies.room_1.users.length + 1}`,
                        avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        id: `bot-${lobbies.room_1.users.length + 1}`,
                        score: 0,
                    });
                }
            }
            if (lobbies.room_1.users.length == 4) {
                io.to("room_1").emit('joinLobby', 'start');
            }

            io.to('room_1').emit("joinLobby", lobbies.room_1.users, lobbies.room_1.timeout);
            lobbies.room_1.timeout -= 1;
        }, 1000)
    });
}
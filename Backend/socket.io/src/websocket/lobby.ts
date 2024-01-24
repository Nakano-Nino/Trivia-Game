import { Server, Socket } from "socket.io";
import { API } from "../lib/API";
import { v4 as uuidv4 } from 'uuid';
import { IQuest } from "../interface/IQuest";
import { Lobby } from "../interface/Lobby";

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

let lobbyGame = getLobby();
export let lobbies = {
    [lobbyGame.roomId]: {
        ...lobbyGame,
    },
};

export default async function lobby(io: Server, socket: Socket) {
    socket.on("joinLobby", async message => {
        let currentLobby = lobbyGame.roomId;

        if (!message.name || !message.avatar) {
            socket.emit('joinLobby', {
                message: "Please provide name and avatar",
            });
            return;
        }

        for (const key in lobbies) {
            console.log("keyID:", key, lobbies[key].users.length, "players");
            if (lobbies[key].users.length > 3) {
                console.log("keyID:", lobbies[key].users.length, "players full");
                const newLobby = getLobby();
                lobbies[newLobby.roomId] = {
                    ...newLobby,
                };
                currentLobby = newLobby.roomId;

                break;
            }
        }

        if (lobbies[currentLobby].questions.length == 0) {
            lobbies[currentLobby].questions = await fetchQuestions();
        }

        lobbies[currentLobby].users.push({
            name: message.name,
            avatar: message.avatar,
            id: socket.id,
            score: 0,
        });

        socket.join(lobbies[currentLobby].roomId);
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

export function getLobby(): Lobby {
    return {
        isEmited: false,
        isFinished: false,
        questions: [],
        users: [],
        timeout: 10,
        roomId: uuidv4(),
    }
}
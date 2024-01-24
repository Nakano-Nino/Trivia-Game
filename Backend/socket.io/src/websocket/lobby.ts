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
        let currentLobby = ""

        if (!message.name || !message.avatar) {
            socket.emit('joinLobby', {
                message: "Please provide name and avatar",
            });
            return;
        }

        const lobbyLength =  Object.keys(lobbies).length
        let currentLength = 1;

        for (const key in lobbies) {
            console.log("keyID:", key, 'has', lobbies[key].users.length, "players");
            if (lobbies[key].users.length === 4) {
                if (lobbyLength - currentLength > 0) {
                    currentLength += 1;
                    continue;
                } else {
                    console.log('Lobby is full, creating new lobby');
                    const newLobby = getLobby();
                    lobbies[newLobby.roomId] = {
                        ...newLobby,
                    };
                    currentLobby = newLobby.roomId;
                    break;
                }
            }
            currentLobby = key;
        }

        console.log("Current lobby: ", currentLobby, "has", lobbies[currentLobby].users.length, "players");

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
            if (lobbies[currentLobby].timeout < 0) {
                clearInterval(interval);
                return;
            }

            if (lobbies[currentLobby].timeout <= 3) {
                if (lobbies[currentLobby].users.length < 4) {
                    lobbies[currentLobby].users.push({
                        name: `bot-${lobbies[currentLobby].users.length + 1}`,
                        avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        id: Math.random().toString(),
                        score: 0,
                    });
                }
            }
            if (lobbies[currentLobby].users.length == 4) {
                clearInterval(interval);
                io.to(lobbies[currentLobby].roomId).emit('joinLobby', 'start');
            }
            
            io.to(lobbies[currentLobby].roomId).emit('joinLobby',
            lobbies[currentLobby].users,
            lobbies[currentLobby].timeout,
            lobbies[currentLobby].roomId
            );
            lobbies[currentLobby].timeout -= 1;
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
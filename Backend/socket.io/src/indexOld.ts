import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Player, PlayerAnswer } from './interface/Player';
import Question from './interface/Question';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let celebMinds = {
    players: [] as Player[],
    questions: [] as Question[],
    gameStarted: false,
    currentRound: 0,
};

async function getQuestions() {
    try {
        const response = await axios.get(
            "https://wondrous-moth-complete.ngrok-free.app/api/v1/get-questions",
            {
              headers: { "ngrok-skip-browser-warning": "true" },
            });
        celebMinds.questions = response.data.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
};

let lastQuestionIndex = -1;
function getRandomQuestion() {
    const availableQuestions = celebMinds.questions.filter((question, index) => index !== lastQuestionIndex);
    if (availableQuestions.length === 0) {
        lastQuestionIndex = -1;
        return getRandomQuestion();
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    lastQuestionIndex = celebMinds.questions.indexOf(selectedQuestion);
    return selectedQuestion;
}

let joinTimer: NodeJS.Timeout | null = null;
let answerTimer: NodeJS.Timeout | null = null;
let revealTimer: NodeJS.Timeout | null = null;
let currentAnswers: PlayerAnswer[] = [];

function startRound() {
    currentAnswers = [];
    const randomQuestion = getRandomQuestion();
    io.emit('question', randomQuestion);
    
    answerTimer = setTimeout(() => {
        io.emit('revealAnswer', {
            correctAnswer: randomQuestion.answer,
            playerChoices: currentAnswers
        });

        revealTimer = setTimeout(() => {
            celebMinds.currentRound++;
            if (celebMinds.currentRound < 5) {
                startRound();
            } else {
                endGame();
            }
        }, 5000);
    }, 5000);
}

function endGame() {
    const rankedPlayers = [...celebMinds.players].sort((a, b) => b.score - a.score);
    if (rankedPlayers.length > 0) {
        rankedPlayers[0].diamonds = (rankedPlayers[0].diamonds || 0) + 10;
    }
    io.emit('endGame', { rankedPlayers, canReplay: true });

    celebMinds.players.forEach(player => {
        player.score = 0;
    })

    setTimeout(() => {
        if (celebMinds.players.length === 0) {
            endRoomSession();
        }
    }, 10000);
}

function endRoomSession() {
    celebMinds.players.forEach(player => {
        io.sockets.sockets.get(player.id)?.disconnect(true);
    });
    celebMinds.players = [];
    celebMinds.gameStarted = false;
    celebMinds.currentRound = 0;
    currentAnswers = [];
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinGame', (data) => {
        celebMinds.players.push({
            id: socket.id,
            name: data.name,
            score: 0,
        });

        if (celebMinds.players.length === 1 && !joinTimer) {
            joinTimer = setTimeout(async () => {

                await getQuestions();

                if ( celebMinds.questions.length > 0) {
                    while (celebMinds.players.length < 4) {
                        celebMinds.players.push({
                            id: `bot-${celebMinds.players.length}`,
                            name: `bot-${celebMinds.players.length}`,
                            score: 0,
                        });
                    }
                    celebMinds.gameStarted = true;
                    io.emit('startGame', celebMinds.players);
                    startRound();
                } else {
                    console.error('Failed to fetch questions');
                    io.emit('error', { message: 'Failed to fetch questions' });
                }
            }, 2000);
        }

        if (celebMinds.players.length === 4 && joinTimer) {
            clearTimeout(joinTimer);
            joinTimer = null;
            celebMinds.gameStarted = true;
            io.emit('startGame', celebMinds.players);
            startRound();
        }
    });

    socket.on('answerQuestion', (data) => {
        if (answerTimer) {
            const currentQuestion = celebMinds.questions[celebMinds.currentRound];
            const player = celebMinds.players.find(player => player.id === socket.id);
            if (player && currentQuestion) {
                currentAnswers.push({ playerId: player.id, answer: data.answer });
                if (data.answer === currentQuestion.answer) {
                    player.score += 1;
                }
                io.emit('scoreUpdate', celebMinds.players);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        celebMinds.players = celebMinds.players.filter(player => player.id !== socket.id);
        if (celebMinds.players.length === 0 && joinTimer) {
            clearTimeout(joinTimer);
            joinTimer = null;
        }
    });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
})
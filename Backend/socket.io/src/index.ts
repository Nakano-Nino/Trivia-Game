import express, { Request, Response } from 'express';
import { createServer } from 'node:http'
import { Server } from 'socket.io';
import cors from 'cors';

import routeSocket from './routes/socket';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        allowedHeaders: '*',
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const port = 5000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("OK");
});

// Socket.io middleware
io.use((socket, next) => {
    next();
});

io.on('connection', socket => {
    console.log(`User connected: ${socket.id}`);
    routeSocket(io, socket);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});
server.listen(port, "127.0.0.1", () => {
    console.log(`Listening on http://localhost:${port}`);
});
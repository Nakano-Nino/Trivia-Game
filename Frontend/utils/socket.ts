import { io, Socket } from "socket.io-client"

let socketInstance: Socket | null = null;

export const initializeSocket = () : Socket => {
    if (!socketInstance) {
        socketInstance = io("https://lemming-merry-amoeba.ngrok-free.app", {
            extraHeaders: {
                "ngrok-skip-browser-warning": "true",
            },
            autoConnect: false,
        });

        window.addEventListener("beforeunload", () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        });
    }
    return socketInstance;
};
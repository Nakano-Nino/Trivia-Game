import axios from "axios";

export const BASE_URL = "https://wondrous-moth-complete.ngrok-free.app";

export const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
})
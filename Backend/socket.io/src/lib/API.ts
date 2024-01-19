import axios from "axios";

export const API = axios.create({
    baseURL: "https://wondrous-moth-complete.ngrok-free.app"
});
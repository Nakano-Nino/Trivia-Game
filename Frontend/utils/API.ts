import axios from "axios";

export const BASE_URL = "https://wondrous-moth-complete.ngrok-free.app";
// export const BASE_URL2 = "https://lemming-merry-amoeba.ngrok-free.app";

export const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
})

// export const API2 = axios.create({
//     baseURL: BASE_URL2,
//     headers: {
//         "ngrok-skip-browser-warning": "true",
//     },
// })
export interface Player {
    id: string;
    name: string;
    email: string;
    score: number;
    avatar: string;
    diamonds?: number;
}

export interface PlayerAnswer {
    playerId: string;
    answer: string;
}
export interface Player {
    id: string;
    name: string;
    score: number;
    diamonds?: number;
}

export interface PlayerAnswer {
    playerId: string;
    answer: string;
}
import { IQuest } from "./IQuest";
import { Player } from "./Player";

export interface Lobby {
    questions: IQuest[];
    users: Player[];
    isEmited: boolean;
    isFinished: boolean;
    timeout: number;
    roomId: string;
}
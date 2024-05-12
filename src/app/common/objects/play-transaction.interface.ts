import { Player } from './player.interface';

export interface PlayTransaction {
    betType: string;
    amountBet: number;
    amountWon: number;
    better: string;
    partner: string;
    opponent1: string;
    opponent2: string;
    players: { [name: string]: Player };
}
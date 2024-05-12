import { Player } from './player.interface';

export interface PlayTransaction {
    betType: string;
    amountBet: number;
    amountWon: number;
    better: Player;
    partner: Player;
    opponent1: Player;
    opponent2: Player;
}
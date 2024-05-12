import { PlayTransaction } from "../common/objects/play-transaction.interface";
import { Player } from "../common/objects/player.interface";
import { ScoreStrategy } from "./score-strategy.interface";

export class ZeroSum implements ScoreStrategy {
    calculateScore(transaction: PlayTransaction): { [name: string]: Player } {
        let score = transaction.amountWon - transaction.amountBet

        // update player data
        transaction.players[transaction.better].score += score;
        transaction.players[transaction.partner].score += score;

        return transaction.players;
    }
}
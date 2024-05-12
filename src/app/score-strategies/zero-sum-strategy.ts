import { PlayTransaction } from "../common/objects/play-transaction.interface";
import { ScoreStrategy } from "./score-strategy.interface";

export class ZeroSum implements ScoreStrategy {
    calculateScore(transaction: PlayTransaction): number {
        return transaction.amountWon - transaction.amountBet;
    }
}
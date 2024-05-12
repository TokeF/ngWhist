import { PlayTransaction } from '../common/objects/play-transaction.interface';

export interface ScoreStrategy {
    calculateScore(transaction: PlayTransaction): number;
}
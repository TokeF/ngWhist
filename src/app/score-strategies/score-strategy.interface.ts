import { BehaviorSubject } from 'rxjs';
import { PlayTransaction } from '../common/objects/play-transaction.interface';
import { Player } from '../common/objects/player.interface';

export interface ScoreStrategy {
    calculateScore(transaction: PlayTransaction): { [name: string]: Player };
}
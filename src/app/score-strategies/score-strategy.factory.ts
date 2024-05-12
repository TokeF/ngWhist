import { Injectable } from "@angular/core";
import { ScoreStrategies } from "./score-strategy.enum";
import { ZeroSum } from "./zero-sum-strategy";

@Injectable({
    providedIn: 'root'
})
export class ScoreStrategyFactory {
    getStrategy(scoreStrategy: ScoreStrategies) {
        switch (scoreStrategy) {
            case ScoreStrategies.LakseDrengene:
                throw new Error('Unknown score strategy');
            case ScoreStrategies.ZeroSum:
                return new ZeroSum();
            default:
                throw new Error('Unknown score strategy');
        }
    }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhistDataService } from '../common/service/whist-data.service';
import { FormArray, FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of, range } from 'rxjs';
import { Player } from '../common/objects/player.interface';
import { PlayTransaction } from '../common/objects/play-transaction.interface';
import { Bets } from '../common/objects/bets.enum';
import { NgFor } from '@angular/common';
import { ScoreStrategyFactory } from '../score-strategies/score-strategy.factory';
import { ScoreStrategy } from '../score-strategies/score-strategy.interface';
import { ZeroSum } from '../score-strategies/zero-sum-strategy';

@Component({
  selector: 'app-whist-game',
  standalone: true,
  imports: [
    CdkTableModule,
    ReactiveFormsModule,
    NgFor,
  ],
  templateUrl: './whist-game.component.html',
  styleUrl: './whist-game.component.css'
})

export class WhistGameComponent implements OnInit {
  scoreStrategy: ScoreStrategy = new ZeroSum(); // needs a default
  names: string[] = [];
  form: FormGroup = new FormGroup({});
  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  players = new BehaviorSubject<{ [name: string]: Player }>({});
  displayedColumns: string[] = ['name', 'score'];
  Bets: Bets[] = [Bets.Nameless, Bets.Vip, Bets.Halve, Bets.Sans, Bets.Gode, Bets.Sol, Bets.RenSol, Bets.Bordlægger];
  AmountWon: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  AmountBet: number[] = this.AmountWon.slice(7);

  constructor(
    private router: Router,
    private whistDataService: WhistDataService,
    private formBuilder: FormBuilder,
    scoreStrategyFactory: ScoreStrategyFactory,
  ) {
    this.whistDataService.currentGameData.subscribe(form => {
      this.names = form.get('names')?.value;
      this.scoreStrategy = scoreStrategyFactory.getStrategy(form.get('selectedPointSystem')?.value);
    });
  }

  ngOnInit() {
    // Table
    this.names.forEach(name => {
      if (name != "") {
        this.players.value[name] = { name: name, score: 0 };
      }
    });
    this.players.subscribe(player => this.dataSource.next(Object.values(player)));

    //Form
    this.form = new FormGroup({
      amountBet: this.formBuilder.control(7),
      betType: this.formBuilder.control('Vip'),
      amountWon: this.formBuilder.control(7),
      player1: this.formBuilder.control(this.names[0]),
      player2: this.formBuilder.control(this.names[1]),
    });
  }

  addPlay() {
    // calc score
    let amtBet = this.form.get('amountBet')!.value;
    let amtWon = this.form.get('amountWon')!.value;
    let transaction: PlayTransaction = {
      better: this.form.get('player1')!.value,
      partner: this.form.get('player2')!.value,
      amountBet: amtBet,
      amountWon: amtWon,
      betType: this.form.get('betType')!.value,
      opponent1: this.players.value[0],
      opponent2: this.players.value[1],
    };
    let score = this.scoreStrategy.calculateScore(transaction);

    // find players
    let p1 = this.players.value[this.form.get('player1')!.value];
    let p2 = this.players.value[this.form.get('player2')!.value];
    let remainingPlayerNames = Object
      .keys(this.players.value)
      .filter(name => name != p1.name && name != p2.name);

    // update player data
    p1.score += score;
    p2.score += score;
    const newData = { ...this.players.value };
    newData[p1.name] = p1;
    newData[p2.name] = p2;
    this.players.next(newData);
  }
}

// export class ScoreDataSource extends DataSource<Player> {
//   private players: Player[] = [{ name: 'test', score: 0 }];

//   constructor() {
//     super();
//   }

//   connect(): Observable<Player[]> {
//     return new BehaviorSubject<Player[]>(this.players);
//   }

//   disconnect() { }
// }

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
import { ScoreStrategies } from '../score-strategies/score-strategy.enum';

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
  names: string[] = [];
  scoreStrategy: ScoreStrategy = new ZeroSum(); // needs a default
  form: FormGroup = new FormGroup({});
  dataSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  players = new BehaviorSubject<{ [name: string]: Player }>({});
  displayedColumns: string[] = ['name', 'score'];
  Bets: Bets[] = [Bets.Nameless, Bets.Vip, Bets.Halve, Bets.Sans, Bets.Gode, Bets.Sol, Bets.RenSol, Bets.Bordlægger];
  AmountWon: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  AmountBet: number[] = this.AmountWon.slice(7);
  TransactionLog: PlayTransaction[] = [];

  constructor(
    private router: Router,
    private whistDataService: WhistDataService,
    private formBuilder: FormBuilder,
    private scoreStrategyFactory: ScoreStrategyFactory,
  ) {
    this.whistDataService.currentGameData.subscribe(form => {
      let namesControl = form.get('names');

      if (namesControl) {
        let names: string[] = namesControl.value.filter((name: string) => name != "");
        if (names && names.length > 0) {
          localStorage.setItem('names', JSON.stringify(names));
        }
      }

      let scoreSystemControl = form.get('selectedPointSystem');
      if (scoreSystemControl) {
        let scoreSystem: string = scoreSystemControl.value;
        if (scoreSystem) {
          localStorage.setItem('scoreSystem', scoreSystem);
        }
      }

      this.names = JSON.parse(localStorage.getItem('names') || '[]');
      let scoreSystemString: string = localStorage.getItem('scoreSystem') || '';
      let scoreSystemEnum: ScoreStrategies = ScoreStrategies[scoreSystemString as keyof typeof ScoreStrategies];
      this.scoreStrategy = scoreStrategyFactory.getStrategy(scoreSystemEnum);
    });
  }

  ngOnInit() {
    // Table
    console.log(localStorage.getItem('names'));
    let names: string[] = JSON.parse(localStorage.getItem('names') || '[]');
    names.forEach(name => {
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
      player1: this.formBuilder.control(names[0]),
      player2: this.formBuilder.control(names[1]),
    });
  }

  addPlay() {
    let transaction: PlayTransaction = {
      amountBet: this.form.get('amountBet')!.value,
      amountWon: this.form.get('amountWon')!.value,
      betType: this.form.get('betType')!.value,
      better: this.form.get('player1')!.value,
      partner: this.form.get('player2')!.value,
      opponent1: Object.keys(this.players.value)[0],
      opponent2: Object.keys(this.players.value)[1],
      players: { ...this.players.value },
    };
    let updatedPlayers = this.scoreStrategy.calculateScore(transaction);
    this.TransactionLog.push(transaction);
    this.players.next(updatedPlayers);

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

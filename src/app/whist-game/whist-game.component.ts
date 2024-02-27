import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhistDataService } from '../whist-data.service';
import { FormArray, FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {CdkTableModule, DataSource} from '@angular/cdk/table';
import { BehaviorSubject, Observable, of, range } from 'rxjs';
import { Player } from '../player';
import { NgFor } from '@angular/common';

export enum Bets {
  Nameless = "Nameless",
  Vip = "Vip",
  Halve = "Halve",
  Sans = "Sans",
  Gode = "Gode",
  Sol = "Sol",
  RenSol = "Ren Sol",
  Bordlægger = "Bordlægger",
}

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
  
  names : string[] = [];
  private scoreSystem : string = '';
  form: FormGroup = new FormGroup({});
  dataSource : BehaviorSubject<any> = new BehaviorSubject<any>([]);
  players = new BehaviorSubject<{[name: string]: Player}>({});
  displayedColumns: string[] = ['name', 'score'];
  Bets :Bets[] = [Bets.Nameless, Bets.Vip, Bets.Halve, Bets.Sans, Bets.Gode, Bets.Sol, Bets.RenSol, Bets.Bordlægger];
  AmountWon : number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  AmountBet : number[] = this.AmountWon.slice(1, 8);

  constructor(
      private router: Router,
      private whistDataService: WhistDataService,
      private formBuilder: FormBuilder
    ) { 
      this.whistDataService.currentGameData.subscribe(form => {
      this.names = form.get('names')?.value;
      this.scoreSystem = form.get('selectedPointSystem')?.value;
    });   
  }

  ngOnInit() {
    // Table
    this.names.forEach(name => {
      if(name != ""){
        this.players.value[name] = {name: name, score: 0};
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
    const cu = this.players.value["Hej"];
    cu.score += 1;
    const newData = {...this.players.value};
    newData["Hej"] = cu;
    this.players.next(newData);
  }
}

export class ScoreDataSource extends DataSource<Player> {
  private players: Player[] = [{ name: 'test', score: 0}];

  constructor() {
    super();
  }

  connect(): Observable<Player[]> {
    return new BehaviorSubject<Player[]>(this.players);
  }

  disconnect() {}
}

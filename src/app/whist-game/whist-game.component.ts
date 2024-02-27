import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhistDataService } from '../whist-data.service';
import { FormArray, FormGroup } from '@angular/forms';
import {CdkTableModule, DataSource} from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Player } from '../player';

@Component({
  selector: 'app-whist-game',
  standalone: true,
  imports: [CdkTableModule],
  templateUrl: './whist-game.component.html',
  styleUrl: './whist-game.component.css'
})
export class WhistGameComponent implements OnInit {
  
  private names : string[] = [];
  private scoreSystem : string = '';
  dataSource : BehaviorSubject<any> = new BehaviorSubject<any>([]);
  players = new BehaviorSubject<{[name: string]: Player}>({});
  displayedColumns: string[] = ['name', 'score'];

  constructor(
      private router: Router,
      private whistDataService: WhistDataService
    ) { 
      this.whistDataService.currentGameData.subscribe(form => {
      this.names = form.get('names')?.value;
      this.scoreSystem = form.get('selectedPointSystem')?.value;
    });   
  }

  ngOnInit() {
    
    this.names.forEach(name => {
      if(name != ""){
        this.players.value[name] = {name: name, score: 0};
      }
    });
    this.players.subscribe(player => this.dataSource.next(Object.values(player)));
    
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

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhistDataService {

  private gameData = new BehaviorSubject<FormGroup>(new FormGroup({}));
  currentGameData = this.gameData.asObservable();

  constructor() { }

  updateGameData(data: FormGroup) {
    this.gameData.next(data);
  }
}

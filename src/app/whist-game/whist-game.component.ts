import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whist-game',
  standalone: true,
  imports: [],
  templateUrl: './whist-game.component.html',
  styleUrl: './whist-game.component.css'
})
export class WhistGameComponent {
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation!.extras.state as {data: any};
  
    if (state) {
      // Now you have access to the form data
      console.log(state.data);
    }
  }
}

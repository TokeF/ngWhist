import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { WhistSectionComponent } from './whist-section/whist-section.component';
import { WhistGameComponent } from './whist-game/whist-game.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'whist', component: WhistSectionComponent },
    { path: 'whist-game', component: WhistGameComponent },
];

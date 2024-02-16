import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: NavBarComponent },
];

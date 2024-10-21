import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {TableComponent } from './views/table/table.component'
import { CardsComponent } from './views/cards/cards.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'table', component: TableComponent },
    { path: 'cards', component: CardsComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
   
];

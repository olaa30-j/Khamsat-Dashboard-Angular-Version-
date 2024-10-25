import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { AdminsComponent } from './views/admins/admins.component';
import { UsersComponent } from './views/users/users.component';
import { ServicesComponent } from './views/services/services.component';
import { CategoriesComponent } from './views/categories/categories.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } 
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

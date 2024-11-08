import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { AdminsComponent } from './views/admins/admins.component';
import { UsersComponent } from './views/users/users.component';
import { ServicesComponent } from './views/services/services.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { SubcategoriesComponent } from './views/subcategories/subcategories.component';
import { ServiceDetailsComponent } from './views/service-details/service-details.component';
import { ServiceLayoutComponent } from './views/service-layout/service-layout.component';
import { OrdersComponent } from './views/orders/orders.component';

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
      { 
        path: 'services', 
        component: ServiceLayoutComponent, 
        children: [
          {path:'table', component:ServicesComponent},
          { path: ':id', component: ServiceDetailsComponent },
        ]
      },
      { path: 'categories', component: CategoriesComponent },
      { path: 'subcategories', component: SubcategoriesComponent },
      { path: 'orders', component: OrdersComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' } 
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './auth/create/create.component';
import { LoggedUserGuard } from './core/guards/logged-user.guard';
import { LogoutUserGuard } from './core/guards/logout-user.guard';
import { UserDefaultHomeComponent } from './pages/user-default-home/user-default-home.component';
import { UserAdminHomeComponent } from './pages/user-admin-home/user-admin-home.component';
import { AdminUserGuard } from './core/guards/admin-user.guard';
import { DefaultUserGuard } from './core/guards/default-user.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    canActivate: [LoggedUserGuard],
    component: DashboardComponent,
  },
  { path: 'login', canActivate: [LogoutUserGuard], component: LoginComponent },
  {
    path: 'create',
    canActivate: [LogoutUserGuard],
    component: CreateComponent,
  },
  {
    path: 'default-home',
    canActivate: [DefaultUserGuard],
    component: UserDefaultHomeComponent,
  },
  {
    path: 'admin-home',
    canActivate: [AdminUserGuard],
    component: UserAdminHomeComponent,
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

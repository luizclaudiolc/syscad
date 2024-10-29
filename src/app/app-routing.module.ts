import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './auth/create/create.component';
import { LoggedUserGuard } from './core/guards/logged-user.guard';
import { LogoutUserGuard } from './core/guards/logout-user.guard';

const routes: Routes = [
  {
    path: '',
    /*     canActivate: [LogoutUserGuard], */
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

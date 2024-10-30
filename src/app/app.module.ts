import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateModule } from './auth/create/create.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginModule } from './auth/login/login.module';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors/tokenInterceptors';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { UserDefaultHomeComponent } from './pages/user-default-home/user-default-home.component';
import { UserAdminHomeComponent } from './pages/user-admin-home/user-admin-home.component';
import { UserDefaultHomeModule } from './pages/user-default-home/user-default-home.module';
import { UserAdminHomeModule } from './pages/user-admin-home/user-admin-home.module';

const appModules = [
  CreateModule,
  NavbarModule,
  LoginModule,
  DashboardModule,
  UserDefaultHomeModule,
  UserAdminHomeModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...appModules,
  ],
  providers: [...httpInterceptorProviders, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

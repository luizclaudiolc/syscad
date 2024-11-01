import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CreateModule } from './auth/create/create.module';
import { LoginModule } from './auth/login/login.module';
import { httpInterceptorProviders } from './core/interceptors/tokenInterceptors';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { UserAdminHomeModule } from './pages/user-admin-home/user-admin-home.module';
import { UserDefaultHomeModule } from './pages/user-default-home/user-default-home.module';
import { NavbarModule } from './shared/navbar/navbar.module';

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

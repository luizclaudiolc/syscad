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

const appModules = [CreateModule, NavbarModule, LoginModule];

@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...appModules,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

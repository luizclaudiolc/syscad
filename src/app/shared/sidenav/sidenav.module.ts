import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav.component';

const appComponents = [SidenavComponent];
const matModelus = [MatSidenavModule, MatListModule, MatIconModule];
const ngxMudules = [CommonModule];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxMudules, ...matModelus],
  exports: [...appComponents]
})
export class SidenavModule { }

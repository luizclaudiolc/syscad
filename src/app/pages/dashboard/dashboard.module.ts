import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';

const appCompoents = [DashboardComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appCompoents],
  imports: [...ngxModules],
  exports: [...appCompoents]
})
export class DashboardModule { }

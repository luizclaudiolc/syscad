import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const appCompoents = [HomeComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appCompoents],
  imports: [...ngxModules],
  exports: [...appCompoents]
})
export class HomeModule { }

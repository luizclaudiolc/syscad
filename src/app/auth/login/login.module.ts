import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';

const appComponets = [LoginComponent];
const ngxModules = [CommonModule];
@NgModule({
  declarations: [...appComponets],
  imports: [...ngxModules],
  exports: [...appComponets],
})
export class LoginModule {}

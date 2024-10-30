import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDefaultHomeComponent } from './user-default-home.component';

const appComponent = [UserDefaultHomeComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxModules],
  exports: [...appComponent],
})
export class UserDefaultHomeModule {}

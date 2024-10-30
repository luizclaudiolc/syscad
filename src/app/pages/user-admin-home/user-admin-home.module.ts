import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminHomeComponent } from './user-admin-home.component';

const appComponent = [UserAdminHomeComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxModules],
  exports: [...appComponent],
})
export class UserAdminHomeModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminHomeComponent } from './user-admin-home.component';
import { TableModule } from 'src/app/shared/table/table.module';

const appComponent = [UserAdminHomeComponent];
const ngxModules = [CommonModule];
const appModules = [TableModule];

@NgModule({
  declarations: [...appComponent],
  imports: [...ngxModules, ...appModules],
  exports: [...appComponent],
})
export class UserAdminHomeModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {TableModule} from "../../shared/table/table.module";

const appCompoents = [DashboardComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appCompoents],
    imports: [...ngxModules, TableModule],
  exports: [...appCompoents]
})
export class DashboardModule { }

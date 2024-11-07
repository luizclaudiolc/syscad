import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {TableModule} from "../../shared/table/table.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const appCompoents = [DashboardComponent];
const ngxModules = [CommonModule];
const matModules = [MatProgressSpinnerModule];
const appModules = [TableModule];

@NgModule({
  declarations: [...appCompoents],
  imports: [...ngxModules, ...matModules, ...appModules],
  exports: [...appCompoents]
})
export class DashboardModule {
}

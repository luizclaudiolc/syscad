import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

const appComponents = [TableComponent];
const ngxModules = [CommonModule];
const matModules = [
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponents],
})
export class TableModule {}

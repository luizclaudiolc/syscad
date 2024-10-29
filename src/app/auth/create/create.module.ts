import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

const appComponets = [CreateComponent];
const ngxModules = [CommonModule, ReactiveFormsModule, RouterModule];
const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  MatIconModule,
  MatSnackBarModule,
  MatDividerModule,
];

@NgModule({
  declarations: [...appComponets],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponets],
})
export class CreateModule {}

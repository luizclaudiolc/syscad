import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

const appComponets = [LoginComponent];
const ngxModules = [CommonModule, ReactiveFormsModule, RouterModule];
const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  FormsModule,
  MatIconModule,
];
@NgModule({
  declarations: [...appComponets],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponets],
})
export class LoginModule {}

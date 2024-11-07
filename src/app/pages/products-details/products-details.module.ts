import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsDetailsComponent} from "./products-details.component";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

const appComponents = [ProductsDetailsComponent];
const ngxModules = [CommonModule, ReactiveFormsModule];
const matModules = [MatCardModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule]

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponents],
})
export class ProductsDetailsModule {
}


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateComponent } from './create.component';

const appComponets = [CreateComponent];
const ngxModules = [CommonModule];

@NgModule({
  declarations: [...appComponets],
  imports: [
    ...ngxModules

  ],
  exports: [...appComponets],
})
export class CreateModule { }

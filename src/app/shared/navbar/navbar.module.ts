import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule} from "@angular/material/card";

const matModules = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule
];
const ngxModules = [CommonModule, RouterModule];
const appComponents = [NavbarComponent];

@NgModule({
  declarations: [...appComponents],
  imports: [...ngxModules, ...matModules],
  exports: [...appComponents],
})
export class NavbarModule {}

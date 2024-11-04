import {Component, OnInit} from '@angular/core';
import {IProducts, ProductsService} from '../products.service';
import {StorageService} from "../../core/storage.service";

const ROLE_ADMIN = 'ADMIN';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected currentUser: string = '';
  protected roleCurrentUser: string = '';
  protected produtos: IProducts[] = [];

  constructor(private readonly storage: StorageService, private readonly productsService: ProductsService) {
  }

  ngOnInit(): void {
    [this.currentUser, this.roleCurrentUser] = [this.storage.getUser().name, this.storage.getUser().role]
    this.productsService.getAll().subscribe((e) => (this.produtos = e));
  }

  protected checkRoleForUser(): boolean {
    console.log(this.storage.getUser().role)
    return (this.storage.getUser().role === ROLE_ADMIN);
  }
}



import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/storage.service';
import { IProducts, ProductsService } from '../products.service';

@Component({
  selector: 'app-user-admin-home',
  templateUrl: './user-admin-home.component.html',
  styleUrls: ['./user-admin-home.component.scss'],
})
export class UserAdminHomeComponent implements OnInit {
  protected currentUser: string = '';
  public produtos: IProducts[] = [];
  constructor(
    private readonly storage: StorageService,
    private readonly productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storage.getUser().name;
    this.productsService.getAll().subscribe((e) => {
      return (this.produtos = e);
    });
  }
}

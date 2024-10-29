import { Component, OnInit } from '@angular/core';
import { IProducts, ProductsService } from '../products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public pd: IProducts[] = [];

  constructor(private readonly productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAll().subscribe((e) => (this.pd = e));
  }
}

import {Component, OnInit} from '@angular/core';
import {IProducts, ProductsService} from "../products.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACK_DEFAULT} from "../../utils/helpers";

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  protected produto!: IProducts;
  produtoForm!: FormGroup;
  protected totalCurrency!: string;

  constructor(
    private readonly productsService: ProductsService,
    private readonly location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snacBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.productsService.getOne(id).subscribe((res: IProducts) => {
      this.produto = res;
      this.produtoForm = this.fb.group({
        cod: [this.produto?.cod || '', Validators.required],
        name: [this.produto?.name || '', Validators.required],
        value: [this.produto?.value || '', Validators.required],
        qtd: [this.produto?.qtd || '', Validators.required],
        user: this.fb.group({
          first_name: [this.produto?.user.first_name || '', Validators.required],
          position: [this.produto?.user.position || '', Validators.required],
        })
      })

      const newValue = +this.produto.qtd * +this.produto.value;
      this.totalCurrency = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(newValue);
    });
  }

  onSubmit(): void {
    if (this.produtoForm.invalid) return;
    const id = String(this.route.snapshot.paramMap.get('id'));
    const updatedProduto = this.produtoForm.getRawValue() as IProducts;

    for (const key in updatedProduto) {
      if (updatedProduto.hasOwnProperty(key)) {
        // @ts-ignore
        const value = updatedProduto[key];

        if (key === 'user') {
          // @ts-ignore
          delete updatedProduto[key];
          continue;
        }

        if (typeof value === 'number') {
          // @ts-ignore
          updatedProduto[key] = String(value);
        }
      }
    }

    this.productsService.updateProducts(id, updatedProduto).subscribe((res: any) => {
      this.snacBar.open('Produto foi atualizado com sucesso!', 'X', SNACK_DEFAULT('center'));
      this.router.navigate(['/dashboard']);
    })
  }

  public goBack(): void {
    this.location.back();
  }
}

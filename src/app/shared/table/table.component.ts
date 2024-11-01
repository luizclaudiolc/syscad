import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProducts } from 'src/app/pages/products.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input('data') public data: IProducts[] = [];
  protected displayedColumns: string[] = [
    'name',
    'cod',
    'value',
    'qtd',
    'user',
  ];
  protected HeaderNamesColumns: string[] = [
    'Nome',
    'Código',
    'Valor',
    'Quantidade',
    'Usuário',
  ];
  public tableData: MatTableDataSource<IProducts>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.tableData = new MatTableDataSource(this.data);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tableData.data = this.data;
    }
  }

  ngOnInit(): void {
    this.tableData.filterPredicate = (data: IProducts, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      // Verifica se o filtro existe em qualquer uma das propriedades relevantes
      const matchFilter =
        data.name.toLowerCase().includes(transformedFilter) ||
        data.cod.toLowerCase().includes(transformedFilter) ||
        data.value.toLowerCase().includes(transformedFilter) ||
        data.qtd.toLowerCase().includes(transformedFilter) ||
        data.user.first_name.toLowerCase().includes(transformedFilter) ||
        data.user.position.toLowerCase().includes(transformedFilter);

      return matchFilter;
    };
  }

  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();

    if (this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }
}

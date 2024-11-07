import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError, delay, retryWhen, take} from 'rxjs/operators';

export interface IProducts {
  id?: string;
  cod: string;
  name: string;
  value: string;
  qtd: string;
  user: {
    first_name: string;
    last_name?: string;
    position: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly TIMEOUT = 15000;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${environment.PRODUTOS}`).pipe(
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retryWhen((errors) =>
        errors.pipe(
          delay(1000), // Atraso de 1 segundo entre as tentativas
          take(2) // Tenta 2 vezes no total (1 tentativa + 1 retry)
        )
      )
    );
  }

  getOne(id: string): Observable<IProducts> {
    return this.http.get<IProducts>(`${environment.PRODUTOS}/${id}`).pipe(
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retryWhen((errors) => {
          return errors.pipe(
            delay(1000),
            take(2)
          );
        }
      )
    )
  }

  updateProducts(id: string, data: IProducts): any {
    return this.http.patch<IProducts>(`${environment.PRODUTOS}/${id}`, data).pipe(
      catchError((error) => {
        console.error(
          'Erro: Servidor demorou mais de 15 segundos para responder.',
          error
        );
        return throwError(() => new Error('Tempo limite excedido'));
      }),
      retryWhen((errors) => {
          return errors.pipe(
            delay(1000),
            take(2)
          );
        }
      )
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_DEFAULT } from '../utils/helpers';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  name: string;
}

export interface ILoginUser {
  email: string;
  passwod: string;
}

export interface ICreateUser extends ILoginUser {
  first_name: string;
  last_name: string;
  position: string;
}

export interface ICreateUserResponse {
  first_name: string;
  last_name: string;
  position: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly storage: StorageService,
    private snackBar: MatSnackBar
  ) {}

  loginUser(user: ILoginUser): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(environment.AUTH_LOGIN, user).pipe(
      tap({
        next: (res: IAuthResponse) => {
          if (!res) return;
          this.storage.saveUser(res);
          this.storage.updateLoginStatus(true);
        },
      }),
      catchError((error) => {
        console.log('Erro capturado:', error);
        if (error.status === 401) {
          this.snackBar.open(
            'Falha ao tentar logar, Este e-mail/senha INCORRETOS!',
            'X',
            SNACK_DEFAULT('center')
          );
        } else {
          this.snackBar.open(
            'Erro desconhecido',
            'Algo deu errado. Tente novamente mais tarde.',
            SNACK_DEFAULT()
          );
          this.router.navigate(['/login']);
        }
        // Retorna um Observable vazio para finalizar a stream de erro
        return of();
      })
    );
  }

  createUser(user: ICreateUser): Observable<ICreateUserResponse> {
    return this.http
      .post<ICreateUserResponse>(environment.AUTH_CREATE, user)
      .pipe(
        tap({
          next(res: ICreateUserResponse) {
            if (!res) return;
          },
        })
      );
  }

  refreshToken(
    refreshToken: string
  ): Observable<{ accessToken: string; refreshToken: string }> {
    const tokenWithoutQuotes =
      refreshToken.startsWith('"') && refreshToken.endsWith('"')
        ? refreshToken.slice(1, -1)
        : refreshToken;
    return this.http.post<{
      accessToken: string;
      refreshToken: string;
    }>(`${environment.REFRESH_TOKEN}`, {
      refreshToken: tokenWithoutQuotes,
    });
  }

  logout() {
    this.storage.clean();
    this.router.navigate(['']);
  }
}

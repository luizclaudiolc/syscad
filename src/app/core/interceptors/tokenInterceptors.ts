import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs/internal/observable/throwError';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AuthService} from '../../auth/auth.service';
import {StorageService} from '../storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storage: StorageService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const {name, accessToken, refreshToken, role, last_name} = this.storage.getUser();
    console.log({name, last_name, accessToken, refreshToken, role});

    if (accessToken && request.url.startsWith(environment.PRODUTOS)) {
      request = this.addToken(request, accessToken);

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && refreshToken) {
            return this.handleRefreshToken(request, next, refreshToken);
          } else {
            this.authService.logout();
            return throwError(
              () => new Error(error.message || 'Erro desconhecido')
            );
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token,
      },
    });
  }

  private handleRefreshToken(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshToken(refreshToken).pipe(
      switchMap((user) => {
        this.storage.saveUser(user);
        return next.handle(this.addToken(request, user.accessToken));
      }),
      catchError((refreshError) => {
        this.authService.logout();
        return throwError(
          () => new Error(refreshError.message || 'Erro desconhecido')
        );
      })
    );
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
];

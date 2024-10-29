import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loginUser(user: any): Observable<any> {
    console.log('USER: ', user);

    return this.http.post<any>(environment.AUTH_LOGIN, user).pipe(
      tap({
        next(value) {
          console.log(value);
        },
      })
    );
  }

  createUser(user: any): Observable<any> {
    for (const [key, value] of Object.entries(user)) {
      if (key === 'confirmPassword') delete user[key];
    }
    console.log('USER: ', user);

    return this.http.post<any>(environment.AUTH_CREATE, user).pipe(
      tap({
        next(value) {
          console.log(value);
        },
      })
    );
  }
}

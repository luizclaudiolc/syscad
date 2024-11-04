import {Injectable} from '@angular/core';
import {IAuthResponse} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public loggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  }

  clean(): void {
    localStorage.clear();
    this.updateLoginStatus(false);
  }

  public saveUser(user: IAuthResponse): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): IAuthResponse {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {} as IAuthResponse;
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    return !!user;
  }

  public isLogged$(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  get getIsLogged(): boolean {
    return this.loggedInSubject.getValue();
  }

  get userRole(): string {
    return this.getUser().role;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    const user = this.getUser();
    if (isLoggedIn) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      this.loggedInSubject.next(isLoggedIn);
      return;
    }
    localStorage.removeItem(USER_KEY);
    this.loggedInSubject.next(isLoggedIn);
  }
}

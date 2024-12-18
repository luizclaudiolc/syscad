import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutUser {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.storage.isLoggedIn()) {
      return true;
    }
    return false;
  }
}

export const LogoutUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(LogoutUser).canActivate(route, state);
};

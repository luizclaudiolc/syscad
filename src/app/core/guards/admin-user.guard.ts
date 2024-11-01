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
export class AdminUser {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.storage.userRole === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }


}

export const AdminUserGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AdminUser).canActivate(route, state);
};

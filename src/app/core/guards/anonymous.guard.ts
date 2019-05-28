import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from '../../main/authentication/services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymousGuard implements CanActivate {

  constructor(
    private currentUserService: CurrentUserService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !this.currentUserService.isAuthenticated();
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CurrentUserService } from '../../main/authentication/services/current-user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {

    constructor(
        private router: Router,
        private currentUserService: CurrentUserService,
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(this.currentUserService.isAuthenticated()) {
            return true;
        } else {
            let redirectUrl = state.url;
            if(['', '/'].indexOf(redirectUrl) !== -1)
                redirectUrl = undefined;
            this.router.navigate(['/login'], {queryParams: {redirect: redirectUrl}});
            return false;
        }
    }
}

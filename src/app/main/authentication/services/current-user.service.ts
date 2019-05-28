import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

class AuthenticatedUser {
  id: number;
  displayName: string;
}

@Injectable()
export class CurrentUserService {
  private currentUser: AuthenticatedUser;
  private currentUserSubject: BehaviorSubject<AuthenticatedUser> = new BehaviorSubject<AuthenticatedUser>(null);

  onUser(): Observable<AuthenticatedUser> {
    return this.currentUserSubject.asObservable();
  }

  getUser(): AuthenticatedUser {
      return this.currentUser;
  }

  setUser(user: AuthenticatedUser) {
    this.currentUser = user;
    console.log('user', user);
    this.currentUserSubject.next(this.currentUser);
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}

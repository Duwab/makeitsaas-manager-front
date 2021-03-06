import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';
import { LocalStorage } from 'ngx-store';
import {environment} from 'environments/environment';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

const API_HOST = environment.apiBaseUrl.replace(/^https?:\/\//, '');
const LOGIN_URL = environment.apiAuthenticationBaseUrl + '/login';
const OAUTH_CALLBACK_URL = environment.apiAuthenticationBaseUrl + '/oauth/:strategy/callback';

interface TokenResponse {
  token: string;
}

export function jwtOptionsFactory(tokenService) {
  return {
    tokenGetter: () => {
      return Promise.resolve(tokenService.getToken());
    },
    whitelistedDomains: [API_HOST]
  };
}

@Injectable()
export class AuthService {

  @LocalStorage() jwt: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {
    if (this.jwt) {
      this.useJwt(this.jwt);
    }
  }

  public getToken(): string {
    return this.jwt;
  }

  login(username, password): Observable<any> {
    return this.http.post<TokenResponse>(LOGIN_URL, {username, password}, {})
      .pipe(map(({token}) => {
        const {decoded, isExpired} = this.parseJWT(token);

        this.useJwt(token);

        if (isExpired) {
          throw new Error('Expired token');
        } else {
          return decoded.user;
        }
      }));
  }

  sendAuthorizationCode(code, strategy): Observable<boolean> {
    // according to RFC, we get from an authorization server a code (unique usage),
    // which we send to our API for it to fetch an access_token
    const url = OAUTH_CALLBACK_URL.replace(':strategy', strategy);
    return this.http.get<TokenResponse>(url, {params: {code}})
      .pipe(map(({token}) => {
        const {decoded, isExpired} = this.parseJWT(token);

        this.useJwt(token);

        return !isExpired;
      }));
  }

  useJwt(token: string) {
    const {decoded, isExpired} = this.parseJWT(token);
    if (!isExpired) {
      this.jwt = token;
      this.currentUserService.setUser(decoded.user);
    } else {
      this.logout();
    }
  }

  logout() {
    this.jwt = null;
    this.currentUserService.setUser(null);
    this.router.navigate(['/login']);
  }

  parseJWT(token: string) {
    return {
      decoded: helper.decodeToken(token),
      expirationDate: helper.getTokenExpirationDate(token),
      isExpired: helper.isTokenExpired(token)
    };
  }
}

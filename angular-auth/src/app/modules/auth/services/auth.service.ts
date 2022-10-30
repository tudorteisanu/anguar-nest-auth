import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ApiRoutes } from '../../../ts/enum';
import {
  CredentialsInterface,
  LoginInterface,
  TokensInterface,
  UserInterface,
} from '../../../ts/interfaces';
import { AuthStoreService } from './auth-store.service';
import {
  AUTHORIZATION_HEADER_KEY,
  AUTHORIZATION_HEADER_PREFIX,
} from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStoreService) {}

  get hasAccessToken(): boolean {
    return !!this.authStore.accessToken;
  }

  login(payload: LoginInterface): Observable<CredentialsInterface> {
    return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload).pipe(
      map((credentials: CredentialsInterface) => {
        this.authStore.login(credentials);
        return credentials;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(ApiRoutes.Logout, {}).pipe(
      map(() => {
        this.authStore.logout();
      })
    );
  }

  getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(ApiRoutes.UserInfo).pipe(
      map((user: UserInterface) => {
        this.authStore.setUserInfo(user);
        return user;
      })
    );
  }

  refreshToken(): Observable<TokensInterface> {
    const headers = {
      [AUTHORIZATION_HEADER_KEY]: `${AUTHORIZATION_HEADER_PREFIX} ${this.authStore.refreshToken}`,
    };
    return this.http.get<TokensInterface>(ApiRoutes.Refresh, { headers }).pipe(
      map(({ accessToken, refreshToken }: TokensInterface) => {
        this.authStore.setAccessToken(accessToken);
        this.authStore.setRefreshToken(refreshToken);
        return { accessToken, refreshToken };
      })
    );
  }
}

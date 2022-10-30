import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthStoreService } from '../services/auth-store.service';
import { ApiRoutes } from '../../../ts/enum';
import { AuthService } from '../services/auth.service';
import { TokensInterface } from '../../../ts/interfaces';
import {
  AUTHORIZATION_HEADER_KEY,
  AUTHORIZATION_HEADER_PREFIX,
} from './token.interceptor';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private authStore: AuthStoreService, private auth: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authStore.refreshToken) {
      return next.handle(request);
    }

    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.catchHttpError(err, request, next)
        )
      );
  }

  catchHttpError(
    err: HttpErrorResponse,
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      err.status === HttpStatusCode.Unauthorized &&
      request.url !== ApiRoutes.Login &&
      !this.isRefreshing
    ) {
      this.isRefreshing = true;
      this.authStore.setAccessToken(null);
      return this.auth.refreshToken().pipe(
        switchMap(({ accessToken }: TokensInterface) => {
          return next.handle(
            request.clone({
              headers: request.headers.set(
                AUTHORIZATION_HEADER_KEY,
                `${AUTHORIZATION_HEADER_PREFIX} ${accessToken}`
              ),
            })
          );
        })
      );
    }

    return throwError(() => err);
  }
}

export const REFRESH_TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshTokenInterceptor,
  multi: true,
};

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthStoreService } from '../services/auth-store.service';
import { ApiRoutes } from '../../../ts/enum';

export const AUTHORIZATION_HEADER_KEY = 'Authorization';
export const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authStore.accessToken) {
      return next
        .handle(
          request.clone({
            headers: request.headers.set(
              AUTHORIZATION_HEADER_KEY,
              `${AUTHORIZATION_HEADER_PREFIX} ${this.authStore.accessToken}`
            ),
          })
        )
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (
              err.status === HttpStatusCode.Unauthorized &&
              request.url !== ApiRoutes.Login
            ) {
              this.authStore.setAccessToken(null);
              this.authStore.setUserInfo(null);
            }
            return throwError(() => err);
          })
        );
    }
    return next.handle(request);
  }
}

export const TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};

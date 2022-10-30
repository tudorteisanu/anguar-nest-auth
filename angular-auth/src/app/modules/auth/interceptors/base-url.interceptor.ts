import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith('http')) {
      return next.handle(
        request.clone({
          url: `${environment.apiUrl}${request.url}`,
        })
      );
    }
    return next.handle(request);
  }
}

export const BASE_URL_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: BaseUrlInterceptor,
  multi: true,
};

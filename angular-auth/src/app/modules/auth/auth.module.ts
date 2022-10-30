import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BASE_URL_PROVIDER } from './interceptors/base-url.interceptor';
import { TOKEN_PROVIDER } from './interceptors/token.interceptor';
import { APP_INITIALIZER_PROVIDER } from './app.initializer';
import { REFRESH_TOKEN_PROVIDER } from './interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    BASE_URL_PROVIDER,
    TOKEN_PROVIDER,
    APP_INITIALIZER_PROVIDER,
    REFRESH_TOKEN_PROVIDER,
  ],
})
export class AuthModule {}

import { AuthService } from './services/auth.service';
import { APP_INITIALIZER } from '@angular/core';

export function initializeAppFactory(authService: AuthService): () => void {
  return () => {
    if (authService.hasAccessToken) {
      authService.getUserInfo().subscribe();
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [AuthService],
  multi: true,
};

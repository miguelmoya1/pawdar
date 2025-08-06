import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth.service.contract';

export const isLoggedFn: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  return toObservable(authService.isReady).pipe(
    filter((isFirebaseStable) => Boolean(isFirebaseStable)),
    switchMap(async () => {
      if (authService.isLogged()) {
        return true;
      }

      return await authService.loginGoogle();
    }),
  );
};

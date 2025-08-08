import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth.service.contract';

export const isLoggedFn: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  const isReady$ = toObservable(authService.isReady);

  return isReady$.pipe(
    filter((isReady) => Boolean(isReady)),
    switchMap(async () => {
      if (authService.userResource.hasValue()) {
        return true;
      }

      return await authService.loginGoogle();
    }),
  );
};

import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth.service.contract';

export const isLoggedFn: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  return toObservable(authService.isReady).pipe(
    filter((isFirebaseStable) => isFirebaseStable),
    filter(() => authService.isReady()),
    switchMap(() =>
      authService.isLogged() ? of(true) : authService.loginGoogle(),
    ),
  );
};

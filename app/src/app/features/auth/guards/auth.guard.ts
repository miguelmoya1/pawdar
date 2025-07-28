import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth-service.contract';

export const isLoggedFn: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AUTH_SERVICE);

  return toObservable(authService.isReady).pipe(
    filter((isFirebaseStable) => isFirebaseStable),
    map(() => (authService.isLogged() ? true : router.parseUrl('/login')))
  );
};

export const isNotLoggedFn: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AUTH_SERVICE);

  return toObservable(authService.isReady).pipe(
    filter((isFirebaseStable) => isFirebaseStable),
    map(() => (!authService.isLogged() ? true : router.parseUrl('/home')))
  );
};

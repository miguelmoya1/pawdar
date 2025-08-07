import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { combineLatest, filter, switchMap } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth.service.contract';

export const isLoggedFn: CanActivateFn = () => {
  const authService = inject(AUTH_SERVICE);

  const isReady$ = toObservable(authService.isReady);
  const isLoadingUser$ = toObservable(authService.user.isLoading);

  return combineLatest({
    isReady: isReady$,
    isUserLoading: isLoadingUser$,
  }).pipe(
    filter(({ isReady, isUserLoading }) => isReady && !isUserLoading),
    switchMap(async () => {
      if (authService.isLogged()) {
        return true;
      }

      return await authService.loginGoogle();
    }),
  );
};

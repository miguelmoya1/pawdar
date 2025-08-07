import { InjectionToken, Resource, Signal } from '@angular/core';
import { UserEntity } from '../../users';
import { AuthServiceImpl } from './auth.service';

export interface AuthService {
  readonly isLogged: Signal<boolean>;
  readonly user: Resource<UserEntity | undefined>;
  readonly isReady: Signal<boolean>;

  loginGoogle(): Promise<boolean>;
  logout(): Promise<void>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthServiceImpl(),
});

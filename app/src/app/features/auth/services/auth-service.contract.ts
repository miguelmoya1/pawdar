import { InjectionToken, Signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthServiceImpl } from './auth-service';

export interface AuthService {
  readonly isLogged: Signal<boolean>;
  readonly user: Signal<User | null>;
  readonly isReady: Signal<boolean>;

  loginGoogle(): Promise<void>;
  logout(): Promise<void>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthServiceImpl(),
});

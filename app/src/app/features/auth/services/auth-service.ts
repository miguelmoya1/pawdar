import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AuthService } from './auth-service.contract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #functions = inject(Functions);
  readonly #auth = inject(Auth);
  readonly #isReady = signal(false);
  readonly #googleProvider = new GoogleAuthProvider();

  readonly user = toSignal(user(this.#auth), { initialValue: null });
  readonly isLogged = computed(() => Boolean(this.user()));
  readonly isReady = this.#isReady.asReadonly();

  constructor() {
    this.#initialize();
  }

  public async loginGoogle() {
    await signInWithPopup(this.#auth, this.#googleProvider);
    const upsetUser = httpsCallable(this.#functions, 'upsetUser');

    await upsetUser();
  }

  public async logout() {
    await signOut(this.#auth);
  }

  async #initialize() {
    await this.#auth.authStateReady();

    this.#googleProvider.addScope('profile');
    this.#googleProvider.addScope('email');

    this.#isReady.set(true);
  }
}

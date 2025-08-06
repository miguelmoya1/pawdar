import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { map } from 'rxjs';
import { AuthService } from './auth.service.contract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #functions = inject(Functions);
  readonly #auth = inject(Auth);
  readonly #isReady = signal(false);
  readonly #googleProvider = new GoogleAuthProvider();

  readonly user = rxResource({
    stream: () => user(this.#auth).pipe(map((user) => user || undefined)),
  });
  readonly isLogged = computed(() => Boolean(this.user.hasValue()));
  readonly isReady = this.#isReady.asReadonly();

  constructor() {
    this.#initialize();
  }

  public async loginGoogle() {
    await signInWithPopup(this.#auth, this.#googleProvider);

    const upsetUser = httpsCallable<unknown, User>(
      this.#functions,
      'upsetUser',
    );

    try {
      const response = await upsetUser();

      this.user.set(response.data);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async logout() {
    await signOut(this.#auth);
  }

  async #initialize() {
    this.#googleProvider.addScope('profile');
    this.#googleProvider.addScope('email');

    await this.#auth.authStateReady();

    this.user.set(this.#auth.currentUser || undefined);

    this.#isReady.set(true);
  }
}

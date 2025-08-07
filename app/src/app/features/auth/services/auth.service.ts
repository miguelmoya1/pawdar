import { computed, inject, Injectable, resource, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { mapUserToEntity } from '../../users';
import { AuthService } from './auth.service.contract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #firestore = inject(Firestore);
  readonly #functions = inject(Functions);
  readonly #auth = inject(Auth);
  readonly #isReady = signal(false);
  readonly #googleProvider = new GoogleAuthProvider();
  readonly #userId = signal<string | undefined>(undefined);

  readonly #user = resource({
    params: () => ({ userId: this.#userId() }),
    loader: async ({ params }) => {
      const userId = params.userId;

      if (!userId) {
        return undefined;
      }

      const docRef = doc(this.#firestore, 'users', userId);

      const userSnapshot = await getDoc(docRef);

      if (!userSnapshot.exists()) {
        return undefined;
      }

      return mapUserToEntity(
        {
          ...userSnapshot.data(),
          photoURL: this.#auth.currentUser?.photoURL,
        },
        userSnapshot.id,
      );
    },
  });

  public readonly user = this.#user.asReadonly();
  readonly isLogged = computed(() => Boolean(this.user.hasValue()));
  readonly isReady = this.#isReady.asReadonly();

  constructor() {
    this.#initialize();
  }

  public async loginGoogle() {
    await signInWithPopup(this.#auth, this.#googleProvider);

    const upsetUser = httpsCallable(this.#functions, 'upsetUser');

    try {
      const { data } = await upsetUser();

      const uid = this.#auth.currentUser?.uid;

      if (!uid) {
        return false;
      }

      this.#user.set(mapUserToEntity(data, uid));
      this.#userId.set(uid);
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

    this.#userId.set(this.#auth.currentUser?.uid);
    // ! need this to wait doe the trigger of the user resource
    setTimeout(() => {
      this.#isReady.set(true);
    });
  }
}

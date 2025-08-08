import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { BaseResponseDto } from '../../../dto/base-response.dto';
import { mapUserToEntity } from '../../users';
import { AuthService } from './auth.service.contract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #firestore = inject(Firestore);
  readonly #functions = inject(Functions);
  readonly #auth = inject(Auth);
  readonly #isReady = signal(false);
  readonly #googleProvider = new GoogleAuthProvider();
  readonly #userAuthResource = rxResource({
    stream: () => {
      return user(this.#auth);
    },
  });

  readonly #userResource = resource({
    params: () => ({
      userAuth: this.#userAuthResource.hasValue()
        ? this.#userAuthResource.value()
        : undefined,
    }),
    loader: async ({ params }) => {
      const userAuth = params.userAuth;

      if (!userAuth) {
        return undefined;
      }

      const docRef = doc(this.#firestore, 'users', userAuth.uid);

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

  public readonly userResource = this.#userResource.asReadonly();
  readonly isReady = computed(() => {
    return (
      this.#isReady() &&
      !this.#userAuthResource.isLoading() &&
      !this.#userResource.isLoading()
    );
  });

  constructor() {
    this.#initialize();
  }

  public async loginGoogle() {
    await signInWithPopup(this.#auth, this.#googleProvider);

    const upsetUser = httpsCallable<undefined, BaseResponseDto<unknown>>(
      this.#functions,
      'upsetUser',
    );

    try {
      const { data } = await upsetUser();

      if (!data.uid) {
        return false;
      }

      this.#userResource.set(mapUserToEntity(data.data, data.uid));
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

    this.#userAuthResource.set(this.#auth.currentUser);
    this.#isReady.set(true);
  }
}

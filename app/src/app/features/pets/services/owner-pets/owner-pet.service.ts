import { inject, Injectable, resource } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AUTH_SERVICE } from '../../../auth';
import { mapPetToEntity } from '../../mappers/pet.mapper';
import { OwnerPetService } from './owner-pet.service.contract';

@Injectable()
export class OwnerPetServiceImpl implements OwnerPetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #authService = inject(AUTH_SERVICE);
  readonly #petsResource = resource({
    params: () => ({
      ownerId: this.#authService.userResource.value()?.uid,
    }),
    loader: async ({ params }) => {
      const { ownerId } = params;

      if (!ownerId) {
        console.warn('No ownerId provided, returning empty pets list.');
        return undefined;
      }

      const queryRef = query(
        this.#petCollection,
        where('ownerId', '==', ownerId),
      );

      const docsRef = await getDocs(queryRef);

      return docsRef.docs.map((doc) => {
        return mapPetToEntity(doc.data(), doc.id);
      });
    },
  });

  public readonly petsResource = this.#petsResource.asReadonly();

  public reload() {
    this.#petsResource.reload();
  }
}

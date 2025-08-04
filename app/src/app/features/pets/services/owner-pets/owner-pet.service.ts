import { inject, Injectable, resource } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { AUTH_SERVICE } from '../../../auth';
import { mapPetArrayToEntityArray } from '../../mappers/pet.mapper';
import { OwnerPetService } from './owner-pet.service.contract';

@Injectable()
export class OwnerPetServiceImpl implements OwnerPetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #authService = inject(AUTH_SERVICE);
  readonly #pets = resource({
    params: () => ({
      ownerId: this.#authService.user.value()?.uid,
    }),
    loader: async ({ params }) => {
      const { ownerId } = params;

      const queryRef = query(
        this.#petCollection,
        where('ownerId', '==', ownerId),
      );

      const docs = await getDocs(queryRef);

      return mapPetArrayToEntityArray(docs.docs);
    },
    defaultValue: [],
  });

  public readonly pets = this.#pets.asReadonly();
}

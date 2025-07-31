import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  collection,
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { AUTH_SERVICE } from '../../../auth';
import { mapPetArrayToEntityArray } from '../../mappers/pet.mapper';
import { OwnerPetService } from './owner-pet.service.contract';

@Injectable()
export class OwnerPetServiceImpl implements OwnerPetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #authService = inject(AUTH_SERVICE);
  readonly #pets = rxResource({
    params: () => ({
      ownerId: this.#authService.user()?.uid,
    }),
    stream: ({ params }) => {
      const { ownerId } = params;

      const queryRef = query(
        this.#petCollection,
        where('ownerId', '==', ownerId),
      );

      return collectionData(queryRef).pipe(map(mapPetArrayToEntityArray));
    },
    defaultValue: [],
  });

  public readonly pets = this.#pets.asReadonly();
}

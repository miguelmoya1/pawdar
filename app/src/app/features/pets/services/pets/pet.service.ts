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
import { mapPetArrayToEntityArray } from '../../mappers/pet.mapper';
import { PetService } from './pet.service.contract';

@Injectable()
export class PetServiceImpl implements PetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #pets = rxResource({
    stream: () => {
      const queryRef = query(
        this.#petCollection,
        where('status', '==', 'missing'),
        // TODO: Add geolocation filter (geohash)
      );

      return collectionData(queryRef).pipe(map(mapPetArrayToEntityArray));
    },
    defaultValue: [],
  });

  public readonly pets = this.#pets.asReadonly();
}

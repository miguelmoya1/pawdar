import { inject, Injectable, resource } from '@angular/core';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { mapPetArrayToEntityArray } from '../../mappers/pet.mapper';
import { PetService } from './pet.service.contract';

@Injectable()
export class PetServiceImpl implements PetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #pets = resource({
    loader: async () => {
      const queryRef = query(
        this.#petCollection,
        where('status', '==', 'missing'),
        // TODO: Add geolocation filter (geohash)
      );

      const data = await getDocs(queryRef);

      return mapPetArrayToEntityArray(data.docs);
    },
  });

  public readonly pets = this.#pets.asReadonly();
}

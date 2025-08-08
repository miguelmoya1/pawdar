import { inject, Injectable, resource } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { mapPetToEntity } from '../../mappers/pet.mapper';
import { PetService } from './pet.service.contract';

@Injectable()
export class PetServiceImpl implements PetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');
  readonly #petsResource = resource({
    loader: async () => {
      const queryRef = query(
        this.#petCollection,
        where('status', '==', 'missing'),
        // TODO: Add geolocation filter (geohash)
      );

      const petSnapshot = await getDocs(queryRef);

      const pets = petSnapshot.docs.map((doc) => {
        return mapPetToEntity(doc.data(), doc.id);
      });

      return pets;
    },
  });

  public readonly petsResource = this.#petsResource.asReadonly();

  public async reload() {
    this.#petsResource.reload();
  }
}

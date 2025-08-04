import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { CreatePetDto } from '../../dto/create-pet.dto';
import { CreatePetService } from './create-pet.service.contract';

@Injectable()
export class CreatePetServiceImpl implements CreatePetService {
  readonly #firestore = inject(Firestore);
  readonly #petCollection = collection(this.#firestore, 'pets');

  public async create(create: CreatePetDto) {
    const { ownerId, ...petData } = create;

    if (!ownerId) {
      throw new Error('Create ID is required to create a pet');
    }

    const petEntity = {
      ...petData,
      ownerId,
    };

    await addDoc(this.#petCollection, petEntity);
  }
}

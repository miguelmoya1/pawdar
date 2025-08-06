import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { CreatePetDto } from '../../dto/create-pet.dto';
import { Pet } from '../../entities/pet.entity';
import { CreatePetService } from './create-pet.service.contract';

@Injectable()
export class CreatePetServiceImpl implements CreatePetService {
  readonly #functions = inject(Functions);

  public async create(create: CreatePetDto) {
    await httpsCallable<CreatePetDto, Pet>(
      this.#functions,
      'createPet',
    )(create);
  }
}

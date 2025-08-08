import { InjectionToken } from '@angular/core';
import { CreatePetServiceImpl } from './create-pet.service';

import { CreatePetDto } from '../../dto/create-pet.dto';

export interface CreatePetService {
  readonly create: (create: CreatePetDto, file?: File) => Promise<void>;
}

export const CREATE_PET_SERVICE = new InjectionToken<CreatePetService>(
  'CREATE_PET_SERVICE',
  {
    providedIn: 'root',
    factory: () => new CreatePetServiceImpl(),
  },
);

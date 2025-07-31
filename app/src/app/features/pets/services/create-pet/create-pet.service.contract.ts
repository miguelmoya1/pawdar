import { InjectionToken } from '@angular/core';
import { OwnerPetServiceImpl } from './create-pet.service';

import { CreatePetDto } from '../../dto/create-pet.dto';

export interface OwnerPetService {
  readonly create: (create: CreatePetDto) => Promise<void>;
}

export const OWNER_PET_SERVICE = new InjectionToken<OwnerPetService>(
  'OWNER_PET_SERVICE',
  {
    providedIn: 'root',
    factory: () => new OwnerPetServiceImpl(),
  },
);

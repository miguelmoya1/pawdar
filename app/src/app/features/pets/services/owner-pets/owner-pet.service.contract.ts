import { InjectionToken, Resource } from '@angular/core';
import { PetEntity } from '../../entities/pet.entity';
import { OwnerPetServiceImpl } from './owner-pet.service';

export interface OwnerPetService {
  readonly pets: Resource<PetEntity[] | undefined>;

  reload: () => void;
}

export const OWNER_PET_SERVICE = new InjectionToken<OwnerPetService>(
  'OWNER_PET_SERVICE',
  {
    providedIn: 'root',
    factory: () => new OwnerPetServiceImpl(),
  },
);

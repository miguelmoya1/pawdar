import { InjectionToken, Resource } from '@angular/core';
import { PetEntity } from '../../entities/pet.entity';
import { PetServiceImpl } from './pet.service';

export interface PetService {
  readonly pets: Resource<PetEntity[] | undefined>;

  reload: () => void;
}

export const PET_SERVICE = new InjectionToken<PetService>('PET_SERVICE', {
  providedIn: 'root',
  factory: () => new PetServiceImpl(),
});

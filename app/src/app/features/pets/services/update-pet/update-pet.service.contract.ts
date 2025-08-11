import { InjectionToken } from '@angular/core';
import { UpdatePetDto } from '../../dto/update-pet.dto';
import { UpdatePetServiceImpl } from './update-pet.service';

export interface UpdatePetService {
  update(petId: string, petData: UpdatePetDto, file?: File): Promise<void>;

  markAsMissing(petId: string): Promise<void>;
  markAsSafe(petId: string): Promise<void>;
}

export const UPDATE_PET_SERVICE = new InjectionToken<UpdatePetService>(
  'UPDATE_PET_SERVICE',
  {
    providedIn: 'root',
    factory: () => new UpdatePetServiceImpl(),
  },
);

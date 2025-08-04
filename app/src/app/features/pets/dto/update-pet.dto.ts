import { GeoPoint } from '@angular/fire/firestore';
import { PET_TYPE } from '../../../constants/pet_type';

export type UpdatePetDto = {
  readonly name: string;
  readonly type: PET_TYPE;
  readonly imagesUrl: string[];
  readonly description: string;
  readonly status: 'missing' | 'found' | 'safe';

  readonly lastLocation: GeoPoint;
};

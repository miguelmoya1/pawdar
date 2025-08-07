import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { PET_TYPE } from '../../../constants/pet_type';

export interface Pet {
  readonly ownerId: string;

  readonly name: string;
  readonly type: PET_TYPE;
  readonly imagesUrl: string[];
  readonly description: string;
  readonly status: 'missing' | 'found' | 'safe';

  readonly locationMissing: GeoPoint;
  readonly lastLocation: GeoPoint;
  readonly geohash: string;

  readonly createdAt: Timestamp;
  readonly lastUpdate: Timestamp;
}

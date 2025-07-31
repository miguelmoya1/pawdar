import { GeoPoint } from '@angular/fire/firestore';

export type CreatePetDto = {
  readonly ownerId?: string;

  readonly name: string;
  readonly type: 'dog' | 'cat' | 'other';
  readonly imagesUrl: string[];
  readonly description: string;
  readonly status: 'missing' | 'found' | 'safe';

  readonly locationMissing: GeoPoint;
  readonly lastLocation: GeoPoint;
};

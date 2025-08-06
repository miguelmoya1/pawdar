import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { PET_TYPE } from '../../../constants/pet_type';

export abstract class Pet {
  declare public readonly uid: string;
  declare public readonly ownerId: string;

  declare public readonly name: string;
  declare public readonly type: PET_TYPE;
  declare public readonly imagesUrl: string[];
  declare public readonly description: string;
  declare public readonly status: 'missing' | 'found' | 'safe';

  declare public readonly locationMissing: GeoPoint;
  declare public readonly lastLocation: GeoPoint;
  declare public readonly geohash: string;

  declare public readonly createdAt: Timestamp;
  declare public readonly lastUpdate: Timestamp;

  protected constructor(pet: Pet) {
    this.uid = pet.uid;
    this.ownerId = pet.ownerId;

    this.name = pet.name;
    this.type = pet.type;
    this.imagesUrl = pet.imagesUrl;
    this.description = pet.description;
    this.status = pet.status;

    this.locationMissing = pet.locationMissing;
    this.lastLocation = pet.lastLocation;
    this.geohash = pet.geohash;

    this.createdAt = pet.createdAt;
    this.lastUpdate = pet.lastUpdate;
  }
}

export class PetEntity extends Pet {
  public static from(pet: Pet) {
    return new PetEntity(pet);
  }
}

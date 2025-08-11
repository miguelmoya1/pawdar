import { GeoPoint, Timestamp } from '@angular/fire/firestore';
import { PET_TYPE } from '../../../constants/pet_type';

export abstract class Pet {
  public declare readonly uid: string;
  public declare readonly ownerId: string;

  public declare readonly name: string;
  public declare readonly type: PET_TYPE;
  public declare readonly imagesUrl: string[];
  public declare readonly description: string;
  public declare readonly status: 'missing' | 'safe';

  public declare readonly locationMissing: GeoPoint;
  public declare readonly lastLocation: GeoPoint;
  public declare readonly geohash: string;

  public declare readonly createdAt: Timestamp;
  public declare readonly lastUpdate: Timestamp;

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

  public isMissing() {
    return this.status === 'missing';
  }

  public isSafe() {
    return this.status === 'safe';
  }
}

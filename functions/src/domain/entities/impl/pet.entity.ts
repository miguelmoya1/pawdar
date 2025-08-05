import { firestore } from "firebase-admin";

export abstract class Pet {
  readonly id?: string;
  readonly ownerId: string;

  readonly name: string;
  readonly type: "dog" | "cat" | "other";
  readonly imagesUrl: string[];
  readonly description: string;
  readonly status: "missing" | "found" | "safe";

  readonly locationMissing: firestore.GeoPoint;
  readonly lastLocation: firestore.GeoPoint;
  readonly geohash: string;

  readonly createdAt: firestore.Timestamp;
  readonly lastUpdate: firestore.Timestamp;

  protected constructor(pet: Pet) {
    this.id = pet.id;
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
  public static create(pet: Pet) {
    return new PetEntity(pet);
  }
}

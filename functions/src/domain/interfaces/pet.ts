import { firestore } from "firebase-admin";

export interface Pet {
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
}

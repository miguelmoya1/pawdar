import { Pet, PetEntity } from '../entities/pet.entity';

const isPet = (obj: unknown): obj is Pet => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['name'] === 'string';
};

/**
 * The uid is the collection id in Firestore.
 */
export const mapPetToEntity = (data: unknown, uid: string) => {
  if (!isPet(data)) {
    console.error('Invalid data structure for Pet:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Pet entity.',
    );
  }

  return PetEntity.from({
    uid: uid,
    name: data.name,
    description: data.description,
    type: data.type,
    imagesUrl: data.imagesUrl,
    status: data.status,
    ownerId: data.ownerId,
    locationMissing: data.locationMissing,
    lastLocation: data.lastLocation,
    geohash: data.geohash,
    createdAt: data.createdAt,
    lastUpdate: data.lastUpdate,
  });
};

import { Pet, PetEntity } from '../entities/pet.entity';

const isPet = (obj: unknown): obj is Pet => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['id'] === 'string';
};

export const mapPetArrayToEntityArray = (data: unknown) => {
  if (!Array.isArray(data) || !data.every(isPet)) {
    console.error('Invalid data structure for PetDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Pet[] entity array.',
    );
  }
  return data.map(mapPetToEntity);
};

export const mapPetToEntity = (data: unknown) => {
  if (!isPet(data)) {
    console.error('Invalid data structure for Pet:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Pet entity.',
    );
  }

  return PetEntity.from({
    uid: data.uid,
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

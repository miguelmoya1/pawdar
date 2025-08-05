import { CreatePetParams } from "../../../repository";
import { Pet, PetEntity } from "../../entities";

const isPet = (pet: unknown): pet is Pet => {
  if (typeof pet !== "object" || pet === null) {
    return false;
  }

  const maybePet = pet as { [key: string]: unknown };

  const requiredFields = ["name", "status", "imagesUrl", "description"];

  for (const field of requiredFields) {
    if (!(field in maybePet)) {
      return false;
    }
  }

  if (
    typeof maybePet.type !== "string" ||
    !["dog", "cat", "other"].includes(maybePet.type)
  ) {
    return false;
  }

  if (
    !Array.isArray(maybePet.imagesUrl) ||
    !maybePet.imagesUrl.every((url) => typeof url === "string")
  ) {
    return false;
  }

  return true;
};

class PetMapper {
  static toEntity(petDto: unknown) {
    if (!isPet(petDto)) {
      throw new Error("Invalid pet data");
    }
    return PetEntity.create(petDto);
  }

  static toCreateDto(pet: unknown) {
    if (!isPet(pet)) {
      throw new Error("Invalid pet data for creation");
    }

    const petParams: CreatePetParams = {
      id: pet.id,
      ownerId: pet.ownerId,
      name: pet.name,
      type: pet.type,
      imagesUrl: pet.imagesUrl,
      description: pet.description,
      status: pet.status,
      locationMissing: pet.locationMissing,
      lastLocation: pet.lastLocation,
      geohash: pet.geohash,
      createdAt: pet.createdAt,
      lastUpdate: pet.lastUpdate,
    };

    return petParams;
  }
}

export { PetMapper };

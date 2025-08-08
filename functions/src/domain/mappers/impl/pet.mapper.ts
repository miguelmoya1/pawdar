import { CreatePetParams } from "../../../repository";
import { PET_TYPE } from "../../constants/pet.constants";
import { Pet, PetEntity } from "../../entities";

const isPet = (pet: unknown): pet is Pet => {
  if (typeof pet !== "object" || pet === null) {
    console.error("Invalid pet data: not an object or null");
    return false;
  }

  const maybePet = pet as { [key: string]: unknown };

  const requiredFields = ["name", "description"];

  for (const field of requiredFields) {
    if (!(field in maybePet)) {
      console.error(`Invalid pet data: missing required field ${field}`);
      return false;
    }
  }

  if (
    typeof maybePet.type !== "string" ||
    !Object.values(PET_TYPE).includes(maybePet.type as PET_TYPE)
  ) {
    console.error("Invalid pet data: type must be 'dog', 'cat', or 'other'");
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
      ownerId: pet.ownerId,
      name: pet.name,
      type: pet.type,
      description: pet.description,
      status: pet.status,
    };

    return petParams;
  }
}

export { PetMapper };

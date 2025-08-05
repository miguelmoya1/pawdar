import { PetMapper } from "../../../domain/mappers";
import { petRepository, userRepository } from "../../../repository";

const handle = async (body: unknown, uid?: string) => {
  if (!uid) {
    throw new Error("User must be authenticated.");
  }

  const user = await userRepository.getById(uid);

  if (!user) {
    throw new Error("User does not exist.");
  }

  let petCreateDto = PetMapper.toCreateDto(body);

  if (!petCreateDto) {
    throw new Error("Invalid pet data.");
  }

  if (!petCreateDto.ownerId) {
    petCreateDto = PetMapper.toCreateDto({
      ...petCreateDto,
      ownerId: uid,
    });
  }

  if (!user.isAdmin() && petCreateDto.ownerId !== uid) {
    throw new Error("User is not authorized to create this pet.");
  }

  return await petRepository.create(petCreateDto);
};

export const createPetCommand = { handle };

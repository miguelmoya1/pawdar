import { AppError } from "../../../domain/errors";
import { PetMapper } from "../../../domain/mappers";
import { petRepository, userRepository } from "../../../repository";

const handle = async (body: unknown, uid?: string) => {
  if (!uid) {
    throw new AppError("unauthenticated", "User must be authenticated.");
  }

  const user = await userRepository.getById(uid);

  if (!user) {
    throw new AppError("not-found", "User does not exist.");
  }

  let petCreateDto = PetMapper.toCreateDto(body);

  if (!petCreateDto) {
    throw new AppError("invalid-argument", "Invalid pet data.");
  }

  if (!petCreateDto.ownerId) {
    petCreateDto = PetMapper.toCreateDto({
      ...petCreateDto,
      ownerId: uid,
    });
  }

  if (!user.isAdmin() && petCreateDto.ownerId !== uid) {
    throw new AppError(
      "permission-denied",
      "User is not authorized to create this pet.",
    );
  }

  return await petRepository.create({ ...petCreateDto, status: "safe" });
};

export const createPetCommand = { handle };

import { AppError } from "../../../domain/errors";
import { PetMapper } from "../../../domain/mappers";
import { petRepository, userRepository } from "../../../repository";
import { BaseResponseDto } from "../../dto/base-response.dto";

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

  const createdPet = await petRepository.create({
    ...petCreateDto,
    status: "safe",
  });

  if (!createdPet) {
    throw new AppError("internal", "Failed to create pet.");
  }

  return BaseResponseDto.create({
    uid: createdPet.id,
    data: createdPet.data,
  });
};

export const createPetCommand = { handle };

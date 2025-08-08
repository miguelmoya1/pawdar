import { auth } from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { AppError } from "../../../domain/errors";
import { UserMapper } from "../../../domain/mappers";
import { userRepository } from "../../../repository";
import { BaseResponseDto } from "../../dto/base-response.dto";

const handle = async (uid?: string) => {
  if (!uid) {
    throw new AppError("unauthenticated", "User must be authenticated.");
  }

  const userRecord = await auth().getUser(uid);

  let userProfile = UserMapper.toCreateDto({
    email: userRecord.email || "",
    username: userRecord.displayName || "",
    lastLogin: Timestamp.now(),
    role: "user",
  });

  const userExists = await userRepository.getById(uid);

  if (!userExists) {
    userProfile = UserMapper.toCreateDto({
      ...userProfile,
      createdAt: Timestamp.now(),
    });
  }

  const result = await userRepository.upset(userProfile, uid);

  if (!result) {
    throw new AppError("internal", "Failed to update user profile.");
  }

  return BaseResponseDto.create({
    uid: result.id,
    data: result.data,
  });
};

export const upsetUserCommand = { handle };

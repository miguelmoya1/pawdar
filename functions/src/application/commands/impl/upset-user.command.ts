import { auth } from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { AppError } from "../../../domain/errors";
import { UserMapper } from "../../../domain/mappers";
import { userRepository } from "../../../repository";

const handle = async (uid?: string) => {
  if (!uid) {
    throw new AppError("unauthenticated", "User must be authenticated.");
  }

  const userExists = await userRepository.getById(uid);

  if (!userExists) {
    const userRecord = await auth().getUser(uid);

    console.log("Creating user with uid:", uid, "and data:", userRecord);

    const userProfile = UserMapper.toCreateDto({
      email: userRecord.email || "",
      username: userRecord.displayName || "",
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      role: "user",
    });

    console.log("User profile to create:", userProfile);

    return await userRepository.create(userProfile, uid);
  }

  console.log("Updating user with uid:", uid);

  return await userRepository.update(uid, {
    lastLogin: Timestamp.now(),
  });
};

export const upsetUserCommand = { handle };

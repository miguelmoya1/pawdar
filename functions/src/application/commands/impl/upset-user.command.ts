import { auth } from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { UserMapper } from "../../../domain";
import { userRepository } from "../../../repository";

const handle = async (uid?: string) => {
  if (!uid) {
    throw new Error("User must be authenticated.");
  }

  const userExists = await userRepository.getById(uid);

  if (!userExists) {
    const userRecord = await auth().getUser(uid);

    const userProfile = UserMapper.toCreateDto({
      uid: userRecord.uid,
      email: userRecord.email || "",
      username: userRecord.displayName || "",
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      role: "user",
    });

    return await userRepository.create(userProfile);
  }

  return await userRepository.update(uid, {
    lastLogin: Timestamp.now(),
  });
};

export const upsetUserCommand = { handle };

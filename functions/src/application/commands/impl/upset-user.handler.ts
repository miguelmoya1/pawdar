import { Timestamp } from "firebase-admin/firestore";
import { logger } from "firebase-functions/v2";
import { CreateUserParams, userRepository } from "../../../repository";
import { auth } from "firebase-admin";

const handle = async (uid?: string) => {
  if (!uid) {
    throw new Error("User must be authenticated.");
  }

  const userExists = await userRepository.getUserById(uid);

  if (!userExists) {
    const userRecord = await auth().getUser(uid);

    const userProfile: CreateUserParams = {
      uid: userRecord.uid,
      email: userRecord.email || "",
      username: userRecord.displayName || "",
      createdAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      role: "user",
    };

    logger.info(`Handling user created: ${userProfile.uid}`);
    return await userRepository.createUser(userProfile);
  }

  logger.info(`Handling user updated: ${uid}`);
  return await userRepository.updateUser(uid, {
    lastLogin: Timestamp.now(),
  });
};

export const upsetUserHandler = { handle };

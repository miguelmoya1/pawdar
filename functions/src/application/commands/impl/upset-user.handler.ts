import { Timestamp } from "firebase-admin/firestore";
import { CreateUserParams, userRepository } from "../../../repository";
import { auth } from "firebase-admin";

const handle = async (uid?: string) => {
  if (!uid) {
    throw new Error("User must be authenticated.");
  }

  const userExists = await userRepository.getById(uid);

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

    return await userRepository.create(userProfile);
  }

  return await userRepository.update(uid, {
    lastLogin: Timestamp.now(),
  });
};

export const upsetUserHandler = { handle };

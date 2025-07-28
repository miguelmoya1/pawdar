import { UserRecord } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import { logger } from "firebase-functions";
import { createUser, CreateUserParams } from "../../../repository";

const handle = async (userRecord: UserRecord) => {
  logger.info(`Handling user created: ${userRecord.uid}`);

  const userProfile: CreateUserParams = {
    uid: userRecord.uid,
    email: userRecord.email || "",
    username: userRecord.displayName || "",
    createdAt: Timestamp.now(),
    lastResourceUpdate: Timestamp.now(),
  };

  await createUser(userProfile);
};

export const onUserCreatedHandler = { handle };

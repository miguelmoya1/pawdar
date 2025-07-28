import {
  FirestoreEvent,
  QueryDocumentSnapshot,
} from "firebase-functions/firestore";
import { logger } from "firebase-functions/v2";
import { onUserCreatedHandler } from "../application/events";
import { UserRecord } from "firebase-admin/auth";

const userCreatedController = async (
  event: FirestoreEvent<
    QueryDocumentSnapshot | undefined,
    {
      userId: string;
    }
  >,
) => {
  const userId = event.params.userId;
  logger.info(`New user document created: ${userId}`);

  const user = event.data?.data();

  if (!user) {
    logger.error(`No user data found for userId: ${userId}`);
    return;
  }

  await onUserCreatedHandler.handle(user as unknown as UserRecord);
};

export { userCreatedController };

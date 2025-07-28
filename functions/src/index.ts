import { onDocumentCreated } from "firebase-functions/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
// import { onCall } from "firebase-functions/v2/https";
import { userCreatedController } from "./presentation/user.controller";

setGlobalOptions({ maxInstances: 10 });

export const onUserCreated = onDocumentCreated(
  "users/{userId}",
  userCreatedController,
);

// export const upgradeBuilding = onCall(upgradeBuildingController);

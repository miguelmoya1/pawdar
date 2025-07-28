import { onDocumentCreated } from "firebase-functions/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
// import { onCall } from "firebase-functions/v2/https";
import { userCreatedController } from "./presentation/user.controller";

setGlobalOptions({ maxInstances: 10 });

export const onUserCreated = onDocumentCreated(
  "users/{userId}",
  userCreatedController,
);

// Callable function to upgrade a building.
// It's important to export the function so it can be deployed.
// export const upgradeBuilding = onCall(upgradeBuildingController);

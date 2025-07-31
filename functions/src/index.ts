import { https, setGlobalOptions } from "firebase-functions/v2";
import { upsetUserController } from "./presentation/user.controller";

setGlobalOptions({ maxInstances: 10 });

export const upsetUser = https.onCall((data) => upsetUserController(data));

// TODO: Add trigger to geohash when pet created or updated
// TODO: add trigger to add ownerId to pet when created

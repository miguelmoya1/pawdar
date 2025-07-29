import { setGlobalOptions, https } from "firebase-functions/v2";
import { upsetUserController } from "./presentation/user.controller";

setGlobalOptions({ maxInstances: 10 });

export const upsetUser = https.onCall((data) => upsetUserController(data));

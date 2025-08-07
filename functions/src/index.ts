import { https, setGlobalOptions } from "firebase-functions/v2";
import { PetController, UserController } from "./presentation";

setGlobalOptions({ maxInstances: 10 });

export const upsetUser = https.onCall((data) =>
  UserController.upsetUserController(data),
);

export const createPet = https.onCall((data) =>
  PetController.createPetController(data),
);

// TODO: Remove the id in the user firestore and entity and the pet

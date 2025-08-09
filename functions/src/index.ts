import { https, setGlobalOptions } from "firebase-functions/v2";
import { PetController, UserController } from "./presentation";

setGlobalOptions({ maxInstances: 10 });

export const upsetUser = https.onCall((data) =>
  UserController.upsetUserController(data),
);

export const createPet = https.onCall((data) =>
  PetController.createPetController(data),
);

// TODO: Add validator for the image size (max 5mb) front

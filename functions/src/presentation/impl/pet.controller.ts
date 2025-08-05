import { CallableRequest, HttpsError } from "firebase-functions/https";
import { createPetCommand } from "../../application/commands";
import { AppError } from "../../domain/errors";

export class PetController {
  public static async createPetController(req: CallableRequest) {
    try {
      return await createPetCommand.handle(req.data, req.auth?.uid);
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpsError(error.code, error.message);
      }

      throw new HttpsError("internal", "An unexpected error occurred.");
    }
  }
}

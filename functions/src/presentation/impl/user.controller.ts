import { CallableRequest, HttpsError } from "firebase-functions/https";
import { upsetUserCommand } from "../../application/commands";
import { AppError } from "../../domain/errors";

export class UserController {
  public static async upsetUserController(req: CallableRequest) {
    try {
      return await upsetUserCommand.handle(req.auth?.uid);
    } catch (error) {
      if (error instanceof AppError) {
        throw new HttpsError(error.code, error.message);
      }

      throw new HttpsError("internal", "An unexpected error occurred.");
    }
  }
}

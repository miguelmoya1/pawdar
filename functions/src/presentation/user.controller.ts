import { upsetUserHandler } from "../application/commands";
import { CallableRequest, HttpsError } from "firebase-functions/https";

const upsetUserController = async (req: CallableRequest) => {
  try {
    return upsetUserHandler.handle(req.auth?.uid);
  } catch (error) {
    throw new HttpsError(
      "unauthenticated",
      error instanceof Error
        ? String(error.message)
        : "An error occurred while processing the request.",
    );
  }
};

export { upsetUserController };

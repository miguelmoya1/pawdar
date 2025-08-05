import { FunctionsErrorCode } from "firebase-functions/https";

export class AppError extends Error {
  public readonly code: FunctionsErrorCode;

  constructor(code: FunctionsErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}

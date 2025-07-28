import { beforeEach, describe, expect, it, vi } from "vitest";
import { userCreatedController } from "./user.controller";
import { logger } from "firebase-functions/v2";
import { onUserCreatedHandler } from "../application/events";
import { FirestoreEvent } from "firebase-functions/firestore";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

vi.mock("../application/events", () => ({
  onUserCreatedHandler: { handle: vi.fn() },
}));

vi.mock("firebase-functions/v2", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

describe("userCreatedController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call handle with user data if present", async () => {
    const fakeUser = { name: "Test", email: "test@example.com" };
    const event = {
      params: { userId: "test-user" },
      data: { data: () => fakeUser },
    } as unknown as FirestoreEvent<QueryDocumentSnapshot, { userId: string }>;

    await userCreatedController(event);

    expect(onUserCreatedHandler.handle).toHaveBeenCalledWith(fakeUser);
    expect(logger.error).not.toHaveBeenCalled();
  });

  it("should log an error and not call handle if user data is missing", async () => {
    const event = {
      params: { userId: "test-user" },
      data: { data: () => undefined },
    } as unknown as FirestoreEvent<QueryDocumentSnapshot, { userId: string }>;

    await userCreatedController(event);

    expect(logger.error).toHaveBeenCalledWith(
      "No user data found for userId: test-user",
    );
    expect(onUserCreatedHandler.handle).not.toHaveBeenCalled();
  });

  it("should log an info message with the userId", async () => {
    const fakeUser = { name: "Test", email: "test@example.com" };
    const event = {
      params: { userId: "test-user" },
      data: { data: () => fakeUser },
    } as unknown as FirestoreEvent<QueryDocumentSnapshot, { userId: string }>;

    await userCreatedController(event);

    expect(logger.info).toHaveBeenCalledWith(
      "New user document created: test-user",
    );
  });
});

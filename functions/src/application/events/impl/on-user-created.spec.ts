import { UserRecord } from "firebase-admin/auth";
import { afterEach, describe, expect, it, vi } from "vitest";
import { onUserCreatedHandler } from "./on-user-created";

vi.mock("../../../repository", () => {
  return {
    createUser: vi.fn(),
    CreateUserParams: {},
  };
});

vi.mock("firebase-functions", () => ({
  logger: {
    info: vi.fn(),
  },
}));

describe("onUserCreatedHandler.handle", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call logger.info and createUser with correct params", async () => {
    const fakeUserRecord = {
      uid: "abc123",
      email: "test@example.com",
      displayName: "test-user",
    } as unknown as UserRecord;

    await onUserCreatedHandler.handle(fakeUserRecord);

    const { logger } = await import("firebase-functions");
    const { createUser } = await import("../../../repository");
    expect(logger.info).toHaveBeenCalledWith("Handling user created: abc123");
    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: "abc123",
        email: "test@example.com",
        username: "test-user",
        resources: expect.objectContaining({
          cpuCycles: 500,
          memory: 250,
          bandwidth: expect.objectContaining({ current: 0, max: 0 }) as unknown,
        }) as unknown,
      }),
    );
  });

  it("should use empty string for missing email and username", async () => {
    const fakeUserRecord = {
      uid: "no-info",
    } as unknown as UserRecord;

    await onUserCreatedHandler.handle(fakeUserRecord);

    const { createUser } = await import("../../../repository");
    expect(createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: "no-info",
        email: "",
        username: "",
      }),
    );
  });
});

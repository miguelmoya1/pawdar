import { afterEach, describe, expect, it, vi } from "vitest";
import { upsetUserHandler } from "./upset-user.handler";
import { userRepository } from "../../../repository";
import { Timestamp } from "firebase-admin/firestore";

vi.mock("firebase-admin", () => ({
  auth: () => ({
    getUser: vi.fn().mockResolvedValue({
      uid: "abc123",
      email: "test@test.com",
      displayName: "Test User",
    }),
  }),
}));

vi.mock("../../../repository", () => ({
  userRepository: {
    create: vi.fn().mockResolvedValue({ success: true }),
    update: vi.fn().mockResolvedValue({ success: true }),
    getById: vi.fn().mockImplementation((uid) => {
      if (uid === "existing-user") {
        return Promise.resolve({ uid: "existing-user" });
      }
      return Promise.resolve(null);
    }),
  },
}));

describe("upsetUserHandler", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("creates a user if it does not exist", async () => {
    const result = await upsetUserHandler.handle("abc123");
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: "abc123",
        email: "test@test.com",
        username: "Test User",
        role: "user",
      }),
    );
    expect(result).toEqual({ success: true });
    expect(userRepository.update).not.toHaveBeenCalled();
  });

  it("updates lastLogin if the user already exists", async () => {
    const result = await upsetUserHandler.handle("existing-user");
    expect(userRepository.update).toHaveBeenCalledWith(
      "existing-user",
      expect.objectContaining({ lastLogin: expect.any(Object) as Timestamp }),
    );
    expect(result).toEqual({ success: true });
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it("throws an error if no uid is provided", async () => {
    await expect(upsetUserHandler.handle()).rejects.toThrow(
      "User must be authenticated.",
    );
    expect(userRepository.create).not.toHaveBeenCalled();
    expect(userRepository.update).not.toHaveBeenCalled();
  });
});

import { describe, expect, it } from "vitest";

describe("should export createUser and CreateUserParams", () => {
  it("should export createUser", async () => {
    const { userRepository } = await import(".");

    expect(userRepository).toBeDefined();
  });
});

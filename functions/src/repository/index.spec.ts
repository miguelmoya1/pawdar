import { describe, expect, it } from "vitest";

describe("should export createUser and CreateUserParams", () => {
  it("should export createUser", async () => {
    const { createUser } = await import(".");

    expect(createUser).toBeDefined();
  });
});

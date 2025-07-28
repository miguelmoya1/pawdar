import { describe, expect, it } from "vitest";
import { onUserCreatedHandler } from "./index";

describe("application/events/index exports", () => {
  it("should export onUserCreatedHandler", () => {
    expect(onUserCreatedHandler).toBeDefined();
  });
});

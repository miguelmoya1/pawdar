import { beforeEach, describe, expect, it, vi } from "vitest";
import { upsetUserHandler } from "../application/commands";
import { upsetUserController } from "./user.controller";
import { CallableRequest } from "firebase-functions/https";

vi.mock("../application/commands", () => ({
  upsetUserHandler: { handle: vi.fn() },
}));

describe("upsetUserController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call the handler upsetUserHandler with the auth uid", async () => {
    const authUid = "test-user";
    const event = {
      auth: { uid: authUid },
    } as unknown as CallableRequest;

    await upsetUserController(event);

    expect(upsetUserHandler.handle).toHaveBeenCalledWith(authUid);
  });
});

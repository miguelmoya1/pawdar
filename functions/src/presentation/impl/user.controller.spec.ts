import { CallableRequest } from "firebase-functions/https";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { upsetUserCommand } from "../../application/commands";
import { upsetUserController } from "./user.controller";

vi.mock("../application/commands", () => ({
  upsetUserCommand: { handle: vi.fn() },
}));

describe("upsetUserController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call the handler upsetUserCommand with the auth uid", async () => {
    const authUid = "test-user";
    const event = {
      auth: { uid: authUid },
    } as unknown as CallableRequest;

    await upsetUserController(event);

    expect(upsetUserCommand.handle).toHaveBeenCalledWith(authUid);
  });
});

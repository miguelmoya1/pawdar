import { CallableRequest } from "firebase-functions/https";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { upsetUserCommand } from "../../application/commands";
import { createPetController } from "./pet.controller";

vi.mock("../application/commands", () => ({
  upsetUserCommand: { handle: vi.fn() },
}));

describe("createPetController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call the handler upsetUserCommand with the auth uid", async () => {
    const authUid = "test-user";
    const event = {
      auth: { uid: authUid },
    } as unknown as CallableRequest;

    await createPetController(event);

    expect(upsetUserCommand.handle).toHaveBeenCalledWith(authUid);
  });
});

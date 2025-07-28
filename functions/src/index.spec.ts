import { describe, expect, it, Mock, vi } from "vitest";

vi.mock("firebase-functions/v2", () => ({
  logger: {
    info: vi.fn(),
  },
  setGlobalOptions: vi.fn(),
}));

vi.mock("./application/events", () => ({
  onUserCreatedHandler: {
    handle: vi.fn(),
  },
}));

vi.mock("firebase-functions/firestore", () => ({
  onDocumentCreated: vi.fn(() => {
    return vi.fn(
      (path: string, handler: (a: unknown) => void | Promise<void>) => {
        // Simulate a document creation event
        const mockEvent = {
          params: { userId: "testUserId" },
          data: {
            data: () => ({
              uid: "testUserId",
              email: "test@example.com",
            }),
          },
        };

        void handler(mockEvent);
      },
    );
  }),
}));

describe("main index for functions", () => {
  describe("setGlobalOptions", () => {
    it("should set maxInstances to 10", async () => {
      const { setGlobalOptions } = await import("firebase-functions/v2");

      await import("./index");

      expect(setGlobalOptions).toHaveBeenCalledWith({ maxInstances: 10 });
    });
  });

  describe("create user when authenticated", () => {
    it("should trigger on user document creation", async () => {
      const { onDocumentCreated } = await import(
        "firebase-functions/firestore"
      );

      await import("./index");

      expect(onDocumentCreated).toHaveBeenCalledWith(
        "users/{userId}",
        expect.any(Function),
      );
    });

    it("should call userCreatedController on document creation", async () => {
      const { userCreatedController } = await import(
        "./presentation/user.controller"
      );

      const { onDocumentCreated } = await import(
        "firebase-functions/firestore"
      );
      const mockHandler = (
        (onDocumentCreated as Mock).mock.calls[0] as unknown[]
      )[1];

      expect(mockHandler).toBe(userCreatedController);
    });
  });
});

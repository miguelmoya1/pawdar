import { describe, expect, it, vi } from "vitest";

vi.mock("firebase-functions/v2", () => ({
  https: {
    onCall: vi.fn((handler: (data: unknown) => Promise<unknown>) => {
      return async (data: unknown) => {
        return handler(data);
      };
    }),
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
});

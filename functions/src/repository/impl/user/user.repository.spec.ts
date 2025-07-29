import { beforeEach, describe, expect, it, vi } from "vitest";
import { User } from "../../../domain";
import { db } from "../db";
import { userRepository } from "./user.repository";

// A more robust mock setup for Firestore operations
const mockDoc = {
  set: vi.fn(() => Promise.resolve("mocked_set_result")),
  get: vi.fn(),
  update: vi.fn(() => Promise.resolve("mocked_update_result")),
};

const mockCollection = {
  doc: vi.fn(() => mockDoc),
};

vi.mock("../db", () => ({
  db: {
    collection: vi.fn(() => mockCollection),
  },
}));

describe("user.repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should call db.collection with correct arguments and return result", async () => {
      const user: User = { uid: "123" } as unknown as User;
      const result = await userRepository.create(user);

      expect(db.collection).toHaveBeenCalledWith("users");
      expect(mockCollection.doc).toHaveBeenCalledWith("123");
      expect(mockDoc.set).toHaveBeenCalledWith(user);
      expect(result).toBe("mocked_set_result");
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.set.mockRejectedValueOnce(new Error("fail"));
      const user: User = { uid: "456" } as unknown as User;
      const result = await userRepository.create(user);
      expect(result).toBeNull();
    });
  });

  describe("getById", () => {
    it("should return user data if document exists", async () => {
      const mockUser = { uid: "test-uid", username: "test-user" };
      mockDoc.get.mockResolvedValue({
        exists: true,
        data: () => mockUser,
      });

      const result = await userRepository.getById("test-uid");

      expect(mockCollection.doc).toHaveBeenCalledWith("test-uid");
      expect(result).toEqual(mockUser);
    });

    it("should return null if document does not exist", async () => {
      mockDoc.get.mockResolvedValue({ exists: false });
      const result = await userRepository.getById("non-existent-uid");
      expect(result).toBeNull();
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.get.mockRejectedValue(new Error("Firestore error"));
      const result = await userRepository.getById("error-uid");
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should call update with correct parameters and return result", async () => {
      const updateData = { username: "new-name" };
      const result = await userRepository.update("test-uid", updateData);

      expect(mockCollection.doc).toHaveBeenCalledWith("test-uid");
      expect(mockDoc.update).toHaveBeenCalledWith(updateData);
      expect(result).toBe("mocked_update_result");
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.update.mockRejectedValue(new Error("Update failed"));
      const result = await userRepository.update("error-uid", {
        username: "wont-work",
      });
      expect(result).toBeNull();
    });
  });
});

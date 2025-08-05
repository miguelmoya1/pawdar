import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pet } from "../../../domain";
import { db } from "../db";
import { petRepository } from "./pet.repository";

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

describe("Pet.repository", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("create", () => {
    it("should call db.collection with correct arguments and return result", async () => {
      const pet: Pet = { id: "123" } as unknown as Pet;
      const result = await petRepository.create(pet);

      expect(db.collection).toHaveBeenCalledWith("pets");
      expect(mockCollection.doc).toHaveBeenCalledWith("123");
      expect(mockDoc.set).toHaveBeenCalledWith(pet);
      expect(result).toBe("mocked_set_result");
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.set.mockRejectedValueOnce(new Error("fail"));
      const Pet: Pet = { uid: "456" } as unknown as Pet;
      const result = await petRepository.create(Pet);
      expect(result).toBeNull();
    });
  });

  describe("getById", () => {
    it("should return Pet data if document exists", async () => {
      const mockPet = { uid: "test-uid", name: "test-Pet" };
      mockDoc.get.mockResolvedValue({
        exists: true,
        data: () => mockPet,
      });

      const result = await petRepository.getById("test-uid");

      expect(mockCollection.doc).toHaveBeenCalledWith("test-uid");
      expect(result).toEqual(mockPet);
    });

    it("should return null if document does not exist", async () => {
      mockDoc.get.mockResolvedValue({ exists: false });
      const result = await petRepository.getById("non-existent-uid");
      expect(result).toBeNull();
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.get.mockRejectedValue(new Error("Firestore error"));
      const result = await petRepository.getById("error-uid");
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should call update with correct parameters and return result", async () => {
      const updateData = { name: "new-name" };
      const result = await petRepository.update("test-uid", updateData);

      expect(mockCollection.doc).toHaveBeenCalledWith("test-uid");
      expect(mockDoc.update).toHaveBeenCalledWith(updateData);
      expect(result).toBe("mocked_update_result");
    });

    it("should return null if an error is thrown", async () => {
      mockDoc.update.mockRejectedValue(new Error("Update failed"));
      const result = await petRepository.update("error-uid", {
        name: "wont-work",
      });
      expect(result).toBeNull();
    });
  });
});

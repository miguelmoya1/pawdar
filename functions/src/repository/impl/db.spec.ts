import { describe, expect, test } from "vitest";
import { db } from "./db.ts";

describe("Firestore DB Tests", () => {
  test("Firestore DB instance should be defined", () => {
    expect(db);
  });

  test("Firestore DB collection method should be a function", () => {
    expect(typeof db.collection, "function");
  });
});

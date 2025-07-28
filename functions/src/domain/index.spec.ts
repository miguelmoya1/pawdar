import { describe, expectTypeOf, it } from "vitest";
import { type Pet, type User } from ".";

describe("domain/index type exports", () => {
  it("should export Pet type", () => {
    expectTypeOf<Pet>().toEqualTypeOf<Pet>();
  });

  it("should export User type", () => {
    expectTypeOf<User>().toEqualTypeOf<User>();
  });
});

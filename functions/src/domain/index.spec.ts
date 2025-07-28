import { describe, expectTypeOf, it } from "vitest";
import { type Node, type User } from ".";

describe("domain/index type exports", () => {
  it("should export Node type", () => {
    expectTypeOf<Node>().toEqualTypeOf<Node>();
  });

  it("should export User type", () => {
    expectTypeOf<User>().toEqualTypeOf<User>();
  });
});

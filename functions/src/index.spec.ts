import {describe, it, expect} from "vitest";
import {helloWorld} from "./index";

describe("Cloud Functions", () => {
  it("helloWorld should be defined", () => {
    expect(helloWorld).toBeDefined();
    expect(typeof helloWorld.apply).toBe("function");
  });
});

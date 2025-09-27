import { describe, expect, it } from "vitest";
import { useDebug } from "../../../app/composables/useDebug";

describe("useDebug", () => {
  it("return extend as defined", async () => {
    expect(useDebug("").extend).toBeDefined;
  });
  it("return as a function", async () => {
    expect(useDebug("")).to.toBeTypeOf("function");
  });
  it("return as a undefined after function usage", async () => {
    expect(useDebug("")("")).to.be.undefined;
  });
});

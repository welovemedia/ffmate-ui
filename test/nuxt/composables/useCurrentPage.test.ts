import { describe, expect, it } from "vitest";
import { useCurrentPage } from "../../../app/composables/useCurrentPage";

describe("useCurrentPage", () => {
  it("return current as undefined", async () => {
    expect(useCurrentPage().current).to.be.undefined;
  });
  it("return setCurrent as defined", async () => {
    expect(useCurrentPage().setCurrent).toBeDefined;
  });
  it("return current as 'test'", async () => {
    expect(useCurrentPage().setCurrent("test")).to.eq("test");
    expect(useCurrentPage().current).to.eq("test");
  });
});

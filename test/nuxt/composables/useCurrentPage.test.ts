import { describe, expect, it } from "vitest";
import { useCurrentPage } from "../../../app/composables/useCurrentPage";

describe("useCurrentPage", () => {
  it("return current as undefined", async () => {
    expect(useSetCurrentPage().current).to.be.undefined;
  });
  it("return setCurrent as defined", async () => {
    expect(useSetCurrentPage().setCurrent).toBeDefined;
  });
  it("return current as 'test'", async () => {
    expect(useSetCurrentPage().setCurrent("test")).to.eq("test");
    expect(useSetCurrentPage().current).to.eq("test");
  });
});

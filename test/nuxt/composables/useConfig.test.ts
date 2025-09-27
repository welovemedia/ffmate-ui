import { describe, expect, it } from "vitest";
import { useConfig } from "../../../app/composables/useConfig";

describe("useConfig", () => {
  it("perPage to be 50", async () => {
    expect(useConfig().perPage).to.eq(50);
  });
});

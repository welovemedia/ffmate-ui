import { describe, expect, it } from "vitest";
import { useMiddleTruncation } from "../../../app/composables/useMiddleTruncation";

describe("useMiddleTruncation", () => {
  it("return to eq ''", async () => {
    expect(useMiddleTruncation("", 0)).to.eq("");
  });
  it("return to eq '...'", async () => {
    expect(useMiddleTruncation("test", 0)).to.eq("...");
  });
  it("return to eq 'a-very-l...ong-test'", async () => {
    expect(useMiddleTruncation("a-very-long-test-a-very-long-test", 20)).to.eq(
      "a-very-l...ong-test",
    );
  });
});

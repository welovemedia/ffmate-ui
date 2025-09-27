import { describe, expect, it } from "vitest";
import { useCopyToClipboard } from "../../../app/composables/useCopyToClipboard";

describe("useCopyToClipboard", () => {
  it("return to not be undefined", async () => {
    expect(useCopyToClipboard()).to.not.be.undefined;
  });
  it("clipboard.write to be undefined", async () => {
    expect(await useCopyToClipboard()("test")).to.be.undefined;
  });
  it("clipboard.read to be defined", async () => {
    const d = Date.now();
    expect(await useCopyToClipboard()(d)).to.be.undefined;
    expect(await navigator.clipboard.readText()).to.eq(d.toString());
  });
});

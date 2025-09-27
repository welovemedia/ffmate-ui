import { describe, expect, it } from "vitest";
import { useConfirm } from "../../../app/composables/useConfirm";
import { Confirm } from "../../../app/stores/confirmStore";

describe("useConfirm", () => {
  it("useConfirm to return undefined", async () => {
    expect(
      useConfirm({
        title: "test title",
        message: "test message",
        cancelCallback: () => {},
        successCallback: () => {},
      } as Confirm),
    ).to.be.undefined;
  });
});

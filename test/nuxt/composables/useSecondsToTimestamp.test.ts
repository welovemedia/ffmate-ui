import { describe, expect, it } from "vitest";
import { useSecondsToTimestamp } from "../../../app/composables/useSecondsToTimestamp";

describe("useSecondsToTimestamp", () => {
  it("60s to eq 00:01:00", async () => {
    expect(useSecondsToTimestamp(60)).to.eq("00:01:00");
  });
  it("90s to eq 00:01:30", async () => {
    expect(useSecondsToTimestamp(90)).to.eq("00:01:30");
  });
});

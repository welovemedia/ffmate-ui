import { describe, expect, it } from "vitest";
import { useIsRouteActive } from "../../../app/composables/useIsRouteActive";

describe("useIsRouteActive", () => {
  it("active route to be 'tasks'", async () => {
    expect(useIsRouteActive({ name: "tasks" })).to.be.true;
  });
  it("active route not to be 'presets'", async () => {
    expect(useIsRouteActive({ name: "presets" })).to.be.false;
  });
});
r
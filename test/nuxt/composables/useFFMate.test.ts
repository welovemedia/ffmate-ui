import FFMate from "../../../app/sdk/ffmate/lib/ffmate";
import { describe, expect, it } from "vitest";
import { useFFMate } from "../../../app/composables/useFFMate";

describe("useFFMate", () => {
  it("ffmate to be defined", async () => {
    const ffmate: FFMate = useFFMate();
    expect(ffmate.Client.getClients).toBeDefined;
  });
});

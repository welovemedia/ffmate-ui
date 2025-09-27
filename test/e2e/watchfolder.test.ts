import { test } from "@nuxt/test-utils/playwright";
import { v4 } from "uuid";

test.describe("Presets", () => {
  test("New", async ({ page }) => {
    await page.goto("/ui/watchfolder?apiServer=http://localhost:3000");

    // click + (add) icon
    await page.locator('[id="__nuxt"]').getByRole("button").click();

    // wait for dialog to close / page change
    await page.waitForTimeout(500);

    const uuid = v4();
    await page.getByRole("textbox", { name: "Enter watchfolder name" }).click();
    await page
      .getByRole("textbox", { name: "Enter watchfolder name" })
      .fill(uuid);

    await page.getByRole("textbox", { name: "Path *" }).click();
    await page.getByRole("textbox", { name: "Path *" }).fill("/dev/null");

    await page.getByRole("switch", { name: "Enabled" }).click();

    // create preset from global preset
    await page.getByRole("button", { name: "Create" }).click();

    // wait for dialog to close / page change
    await page.waitForTimeout(500);

    // waiit for previously created presets to be loaded
    await page.getByText(uuid).first().waitFor({ state: "visible" });
  });
});

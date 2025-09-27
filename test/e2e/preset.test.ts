import { test } from "@nuxt/test-utils/playwright";
import { v4 } from "uuid";

test.describe("Presets", () => {
  test("New", async ({ page }) => {
    await page.goto("/ui/presets?apiServer=http://localhost:3000");

    // click + (add) icon
    await page.locator('[id="__nuxt"]').getByRole("button").click();

    // wait for dialog to close / page change
    await page.waitForTimeout(500);

    // waiit for global presets to be loaded from s3
    await page
      .getByText("Convert to MOV")
      .first()
      .waitFor({ state: "visible" });
    await page.getByText("Convert to MOV").first().click();

    const uuid = v4();
    await page.getByRole("textbox", { name: "preset name" }).click();
    await page.getByRole("textbox", { name: "preset name" }).fill(uuid);

    // create preset from global preset
    await page.getByRole("switch", { name: "Enabled" }).click();
    await page.getByRole("button", { name: "Create" }).click();

    // wait for dialog to close / page change
    await page.waitForTimeout(500);

    // waiit for previously created presets to be loaded
    await page
      .getByText(uuid)
      .first()
      .waitFor({ state: "visible" });

    // click the first one and open it
    await page.getByText("Convert to MOV").first().click();

    // check if details are correc
    await page
      .getByRole("definition")
      .filter({ hasText: "-y -i ${INPUT_FILE} ${" })
      .click();
    await page.getByText("${INPUT_FILE_DIR}/${").click();
    await page.getByText("true").click();
  });
});

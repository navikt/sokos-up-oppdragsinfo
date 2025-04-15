import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import aTrefflisteAppState from "./aTrefflisteAppState";
import { faggruppeList } from "./stubs/faggrupper";

test.describe("Axe a11y", () => {
  test(`/oppdragsinfo should not have any automatically detectable accessibility issues`, async ({
    page,
  }) => {
    await page.route("*/**/faggrupper", async (route) => {
      await route.fulfill({ json: faggruppeList });
    });

    await page.goto("/oppdragsinfo");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    await expect(page.getByRole("heading", { name: "Søk" })).toBeVisible();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  test(`/oppdragsinfo/treffliste should not have any automatically detectable accessibility issues`, async ({
    page,
  }) => {
    await page.context().addInitScript((appState) => {
      window.sessionStorage.setItem("app-state", JSON.stringify(appState));
    }, aTrefflisteAppState);

    await page.goto("/oppdragsinfo/treffliste");

    await expect(
      page.getByRole("heading", { name: "Treffliste" }),
    ).toBeVisible();
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

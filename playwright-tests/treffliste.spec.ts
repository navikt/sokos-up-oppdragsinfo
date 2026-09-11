import { expect, type Page, test } from "@playwright/test";
import type { OppdragsList } from "../src/types/Oppdrag";
import aTrefflisteAppState from "./aTrefflisteAppState";

const FEILMELDING =
	"Simulert feil: klarte ikke å hente trefflisten fra sokos-oppdrag.";

const injisertTreffliste: OppdragsList =
	aTrefflisteAppState.state.oppdragsListe ?? [];

async function setStore(page: Page) {
	await page.context().addInitScript((appState) => {
		window.sessionStorage.setItem("app-state", JSON.stringify(appState));
	}, aTrefflisteAppState);
}

// Trefflisten hentes fra backend ved mount, så /sok må mockes med de samme
// dataene som er injisert i sessionStorage for at testene skal vise den
// trefflisten de forventer.
async function mockSokWillReturnInjectedTreffliste(page: Page) {
	await page.route("**/oppdragsinfo/sok", async (route) => {
		await route.fulfill({
			json: { data: injisertTreffliste, errorMessage: "" },
		});
	});
}

async function mockSokWillFail(page: Page, errorMessage: string) {
	await page.route("**/oppdragsinfo/sok", async (route) => {
		await route.fulfill({ json: { data: [], errorMessage } });
	});
}

// Første kall lykkes, påfølgende kall feiler. Brukes for å teste at
// "Sist oppdatert" viser tidspunktet for siste vellykkede henting.
async function mockSokWillSucceedThenFail(page: Page, errorMessage: string) {
	let callCount = 0;

	await page.route("**/oppdragsinfo/sok", async (route) => {
		callCount += 1;

		await route.fulfill({
			json:
				callCount === 1
					? { data: injisertTreffliste, errorMessage: "" }
					: { data: [], errorMessage },
		});
	});
}

// Lar testen bytte hva /sok returnerer underveis, slik at man kan verifisere at
// trefflisten faktisk hentes på nytt fra backend. Bevisst uten telling av kall,
// siden React.StrictMode dobbelkjører effekter i dev.
async function mockSokWithControllableResponse(page: Page) {
	const respons = { data: injisertTreffliste };

	await page.route("**/oppdragsinfo/sok", async (route) => {
		await route.fulfill({
			json: { data: respons.data, errorMessage: "" },
		});
	});

	return {
		backendReturnerer: (data: OppdragsList) => {
			respons.data = data;
		},
		alleOppdrag: injisertTreffliste,
	};
}

// Oppdrag-siden henter flere ressurser via SWR med suspense. Testene her bryr
// seg kun om navigasjonen, så alt stubbes med tomme svar.
async function mockOppdragsDetaljer(page: Page) {
	await page.route("**/oppdragsinfo/*/skattepliktig", async (route) => {
		await route.fulfill({ json: false });
	});
	await page.route("**/oppdragsinfo/*/oppdragslinjer", async (route) => {
		await route.fulfill({ json: [] });
	});
	await page.route("**/oppdragsinfo/*/enheter", async (route) => {
		await route.fulfill({ json: { enhet: [], behandlendeEnhet: [] } });
	});
}

async function gotoAndAssertBeingOnTrefflistePage(page: Page) {
	await page.goto("/oppdragsinfo/treffliste");
	await expect(
		page.getByRole("heading", { name: "Oppdragsinfo: Treffliste" }),
	).toBeVisible();
}

const reloadKnapp = (page: Page) =>
	page.getByRole("button", { name: "Last inn på nytt" });

test.describe("Treffliste", () => {
	test.beforeEach(({ page }) => {
		setStore(page);
	});

	test.describe("Sist oppdatert", () => {
		test(`viser tidspunkt for hentingen når trefflisten er oppdatert`, async ({
			page,
		}) => {
			await mockSokWillReturnInjectedTreffliste(page);

			await gotoAndAssertBeingOnTrefflistePage(page);

			await expect(page.getByText(/^Sist oppdatert /)).toBeVisible();
		});

		test(`beholder tidspunktet fra siste vellykkede henting når oppdatering feiler`, async ({
			page,
		}) => {
			await mockSokWillSucceedThenFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);
			const sistOppdatert = page.getByText(/^Sist oppdatert /);
			await expect(sistOppdatert).toBeVisible();
			const tidspunktEtterForsteHenting = await sistOppdatert.textContent();

			await reloadKnapp(page).click();
			await expect(page.getByText(FEILMELDING)).toBeVisible();

			await expect(sistOppdatert).toHaveText(
				tidspunktEtterForsteHenting as string,
			);
		});
	});

	test.describe("Henting ved navigasjon", () => {
		test(`henter trefflisten på nytt når man går til oppdrag og tilbake`, async ({
			page,
		}) => {
			const sok = await mockSokWithControllableResponse(page);
			await mockOppdragsDetaljer(page);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(
				page.getByRole("link", { name: "2960-2024-xtest" }),
			).toBeVisible();

			await page.getByRole("link", { name: "2960-2024-xtest" }).click();
			await expect(
				page.getByRole("heading", { name: "Oppdragsinfo: Oppdrag" }),
			).toBeVisible();

			// Simulerer at oppdraget er endret i backend mens bruker var på
			// oppdrag-siden, og derfor ikke lenger er med i trefflisten.
			sok.backendReturnerer(
				sok.alleOppdrag.filter(
					(oppdrag) => oppdrag.fagsystemId !== "2960-2024-xtest",
				),
			);

			await page.getByRole("link", { name: "Treffliste" }).click();
			await expect(
				page.getByRole("heading", { name: "Oppdragsinfo: Treffliste" }),
			).toBeVisible();

			// Trefflisten skal reflektere det siste svaret fra backend, ikke det som ble
			// vist før navigasjonen.
			await expect(
				page.getByRole("link", { name: "2960-test1-th" }),
			).toBeVisible();
			await expect(
				page.getByRole("link", { name: "2960-2024-xtest" }),
			).toBeHidden();
		});
	});

	test.describe("Statusikon på Last inn på nytt", () => {
		test(`viser ikke status etter automatisk henting ved sidelasting`, async ({
			page,
		}) => {
			await mockSokWillReturnInjectedTreffliste(page);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(page.getByText(/^Sist oppdatert /)).toBeVisible();

			await expect(reloadKnapp(page)).toHaveAttribute("data-status", "idle");
		});

		test(`viser suksess-status først etter at knappen er trykket`, async ({
			page,
		}) => {
			await mockSokWillReturnInjectedTreffliste(page);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(reloadKnapp(page)).toHaveAttribute("data-status", "idle");

			await reloadKnapp(page).click();

			await expect(reloadKnapp(page)).toHaveAttribute("data-status", "success");
		});

		test(`viser feil-status når manuell oppdatering feiler`, async ({
			page,
		}) => {
			await mockSokWillSucceedThenFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(reloadKnapp(page)).toHaveAttribute("data-status", "idle");

			await reloadKnapp(page).click();

			await expect(reloadKnapp(page)).toHaveAttribute("data-status", "error");
			await expect(page.getByText(FEILMELDING)).toBeVisible();
		});
	});

	test.describe("Henting av treffliste feiler", () => {
		test(`viser feilmelding når automatisk henting av treffliste feiler ved sidelasting`, async ({
			page,
		}) => {
			await mockSokWillFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);

			await expect(page.getByText(FEILMELDING)).toBeVisible();
		});

		test(`kan lukke feilmeldingen med lukkeknappen`, async ({ page }) => {
			await mockSokWillFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(page.getByText(FEILMELDING)).toBeVisible();

			await page.getByRole("button", { name: "Lukk" }).click();

			await expect(page.getByText(FEILMELDING)).not.toBeVisible();
		});

		test(`viser feilmelding på nytt når "Last inn på nytt" fortsatt feiler`, async ({
			page,
		}) => {
			await mockSokWillFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(page.getByText(FEILMELDING)).toBeVisible();

			await page.getByRole("button", { name: "Lukk" }).click();
			await expect(page.getByText(FEILMELDING)).not.toBeVisible();

			await reloadKnapp(page).click();

			await expect(page.getByText(FEILMELDING)).toBeVisible();
		});

		test(`beholder trefflisten fra forrige vellykkede henting når oppdatering feiler`, async ({
			page,
		}) => {
			await mockSokWillSucceedThenFail(page, FEILMELDING);

			await gotoAndAssertBeingOnTrefflistePage(page);
			await expect(
				page.getByRole("link", { name: "2960-2024-xtest" }),
			).toBeVisible();

			await reloadKnapp(page).click();
			await expect(page.getByText(FEILMELDING)).toBeVisible();

			// Bevisst fallback: den gamle listen blir stående, og "Sist oppdatert"
			// forteller hvor gammel den er.
			await expect(
				page.getByRole("link", { name: "2960-2024-xtest" }),
			).toBeVisible();
		});
	});
});

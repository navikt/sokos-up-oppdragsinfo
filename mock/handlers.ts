import { HttpResponse, http } from "msw";
import { fagGruppeList } from "./data/faggruppeList";
import { gjelderNavn } from "./data/gjelderNavn";
import { oppdragsEnhetDto } from "./data/oppdragsEnhetDto";
import { oppdragsList } from "./data/oppdragsList";
import { oppdragsLinjeList } from "./data/oppdragslinjeList";
import { attestant } from "./data/popups/linje/attestant";
import { gradList } from "./data/popups/linje/grad";
import { kidList } from "./data/popups/linje/kid";
import { kravhaverList } from "./data/popups/linje/kravhaver";
import { linjeEnhetList } from "./data/popups/linje/linjeEnhet";
import { linjeStatusList } from "./data/popups/linje/linjeStatus";
import { maksdatoList } from "./data/popups/linje/maksdato";
import { oppdragsLinjeDetaljer } from "./data/popups/linje/oppdragsLinjerDetaljerDto";
import { ovrigList } from "./data/popups/linje/ovrig";
import { skyldnerList } from "./data/popups/linje/skyldner";
import { tekstList } from "./data/popups/linje/tekst";
import { valutaList } from "./data/popups/linje/valuta";
import { omposteringList } from "./data/popups/omposteringList";
import { oppdragsEnhetList } from "./data/popups/oppdragsEnhetList";
import { oppdragsStatusList } from "./data/popups/oppdragsStatusList";

export const handlers = [
	http.post("/oppdrag-api/api/v1/integration/hentnavn", async ({ request }) => {
		const sokeParameter = await request.json();
		// biome-ignore lint/suspicious/noConsole: debug code
		console.log("Hent parameter navn:", sokeParameter);
		return HttpResponse.json(gjelderNavn, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/kodeverk/faggrupper", () => {
		return HttpResponse.json(fagGruppeList, { status: 200 });
	}),

	http.post("/oppdrag-api/api/v1/oppdragsinfo/sok", async ({ request }) => {
		const sokeParameter = await request.json();
		// biome-ignore lint/suspicious/noConsole: debug code
		console.log("Hent parameter navn:", sokeParameter);
		return HttpResponse.json(
			{ data: oppdragsList, errorMessage: "" },
			{ status: 200 },
		);
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/oppdragsLinjer", () => {
		return HttpResponse.json(oppdragsLinjeList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/enheter", () => {
		return HttpResponse.json(oppdragsEnhetDto, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/enhetshistorikk", () => {
		return HttpResponse.json(oppdragsEnhetList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/omposteringer", () => {
		return HttpResponse.json(omposteringList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/statushistorikk", () => {
		return HttpResponse.json(oppdragsStatusList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/skattepliktig", () => {
		return HttpResponse.json(true, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/attestanter", () => {
		return HttpResponse.json(attestant, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/detaljer", () => {
		return HttpResponse.json(oppdragsLinjeDetaljer, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/enheter", () => {
		return HttpResponse.json(linjeEnhetList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/grader", () => {
		return HttpResponse.json(gradList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kid", () => {
		return HttpResponse.json(kidList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kravhavere", () => {
		return HttpResponse.json(kravhaverList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/maksdatoer", () => {
		return HttpResponse.json(maksdatoList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/ovrig", () => {
		return HttpResponse.json(ovrigList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/skyldnere", () => {
		return HttpResponse.json(skyldnerList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/statuser", () => {
		return HttpResponse.json(linjeStatusList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/tekster", () => {
		return HttpResponse.json(tekstList, { status: 200 });
	}),

	http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/valutaer", () => {
		return HttpResponse.json(valutaList, { status: 200 });
	}),

	http.post("/sokos-skattekort/api/v1/skattekort/bestille", async () => {
		skattekortBestilt = new Date();
		return HttpResponse.json({ data: "", errorMessage: "" }, { status: 201 });
	}),

	http.post("/sokos-skattekort/api/v1/skattekort/status", async () => {
		const status = !skattekortBestilt
			? "IKKE_FORESPURT"
			: Date.now() < skattekortBestilt?.getTime() + 5 * 1000
				? "IKKE_BESTILT"
				: Date.now() < skattekortBestilt?.getTime() + 10 * 1000
					? "BESTILT"
					: Date.now() < skattekortBestilt?.getTime() + 15 * 1000
						? "VENTER_PAA_UTSENDING"
						: /* Og hvis det er mer enn 15s siden man trykket:  */ "SENDT_FORSYSTEM";
		return HttpResponse.json({ status }, { status: 200 });
	}),
];
let skattekortBestilt: Date | null = null;

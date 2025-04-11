/* eslint-disable no-console */
import { HttpResponse, http } from "msw";
import { fagGruppeList } from "./data/faggruppeList";
import { gjelderNavn } from "./data/gjelderNavn";
import { oppdragsEnhetDto } from "./data/oppdragsEnhetDto";
import { oppdragsList } from "./data/oppdragsList";
import { oppdragsLinjeList } from "./data/oppdragslinjeList";
import { attestant } from "./data/popups/linje/attestant";
import detaljer from "./data/popups/linje/detaljer.json";
import enhet from "./data/popups/linje/enhet.json";
import grad from "./data/popups/linje/grad.json";
import kid from "./data/popups/linje/kidliste.json";
import kravhaver from "./data/popups/linje/kravhaver.json";
import maksdato from "./data/popups/linje/maksdato.json";
import ovrig from "./data/popups/linje/ovrig.json";
import skyldner from "./data/popups/linje/skyldner.json";
import status from "./data/popups/linje/status.json";
import tekst from "./data/popups/linje/tekst.json";
import valuta from "./data/popups/linje/valuta.json";
import { omposteringList } from "./data/popups/omposteringList";
import { oppdragsEnhetList } from "./data/popups/oppdragsEnhetList";
import { oppdragsStatusList } from "./data/popups/oppdragsStatusList";

export const handlers = [
  http.post("/oppdrag-api/api/v1/integration/hentnavn", async ({ request }) => {
    const sokeParameter = await request.json();
    console.log("Hent parameter navn:", sokeParameter);
    return HttpResponse.json(gjelderNavn, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/kodeverk/faggrupper", () => {
    return HttpResponse.json(fagGruppeList, { status: 200 });
  }),

  http.post("/oppdrag-api/api/v1/oppdragsinfo/sok", async ({ request }) => {
    const sokeParameter = await request.json();
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

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/attestanter", () => {
    return HttpResponse.json(attestant, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/detaljer", () => {
    return HttpResponse.json(detaljer, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/enheter", () => {
    return HttpResponse.json(enhet, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/grader", () => {
    return HttpResponse.json(grad, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kid", () => {
    return HttpResponse.json(kid, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kravhavere", () => {
    return HttpResponse.json(kravhaver, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/maksdatoer", () => {
    return HttpResponse.json(maksdato, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/ovrig", () => {
    return HttpResponse.json(ovrig, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/skyldnere", () => {
    return HttpResponse.json(skyldner, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/statuser", () => {
    return HttpResponse.json(status, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/tekster", () => {
    return HttpResponse.json(tekst, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/valutaer", () => {
    return HttpResponse.json(valuta, { status: 200 });
  }),
];

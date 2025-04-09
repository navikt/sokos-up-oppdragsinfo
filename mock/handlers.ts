/* eslint-disable no-console */
import { HttpResponse, http } from "msw";
import faggrupper from "./json/faggrupper.json";
import gjelderNavn from "./json/gjelderNavn.json";
import oppdrag from "./json/oppdrag.json";
import oppdragsEnheter from "./json/oppdrag_enheter.json";
import oppdragsLinjer from "./json/oppdragslinjer.json";
import enhetshistorikk from "./json/popups/enhetshistorikk.json";
import attestant from "./json/popups/linje/attestant.json";
import detaljer from "./json/popups/linje/detaljer.json";
import enhet from "./json/popups/linje/enhet.json";
import grad from "./json/popups/linje/grad.json";
import kid from "./json/popups/linje/kidliste.json";
import kravhaver from "./json/popups/linje/kravhaver.json";
import maksdato from "./json/popups/linje/maksdato.json";
import ovrig from "./json/popups/linje/ovrig.json";
import skyldner from "./json/popups/linje/skyldner.json";
import status from "./json/popups/linje/status.json";
import tekst from "./json/popups/linje/tekst.json";
import valuta from "./json/popups/linje/valuta.json";
import omposteringer from "./json/popups/omposteringer.json";
import statushistorikk from "./json/popups/statushistorikk.json";

export const handlers = [
  http.post("/oppdrag-api/api/v1/integration/hentnavn", async ({ request }) => {
    const sokeParameter = await request.json();
    console.log("Hent parameter navn:", sokeParameter);
    return HttpResponse.json(gjelderNavn, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/kodeverk/faggrupper", () => {
    return HttpResponse.json(faggrupper, { status: 200 });
  }),

  http.post("/oppdrag-api/api/v1/oppdragsinfo/sok", async ({ request }) => {
    const sokeParameter = await request.json();
    console.log("Hent parameter navn:", sokeParameter);
    return HttpResponse.json({ data: oppdrag }, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/oppdragsLinjer", () => {
    return HttpResponse.json(oppdragsLinjer, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/enheter", () => {
    return HttpResponse.json(oppdragsEnheter, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/enhetshistorikk", () => {
    return HttpResponse.json(enhetshistorikk, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/omposteringer", () => {
    return HttpResponse.json(omposteringer, { status: 200 });
  }),

  http.get("/oppdrag-api/api/v1/oppdragsinfo/:id/statushistorikk", () => {
    return HttpResponse.json(statushistorikk, { status: 200 });
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

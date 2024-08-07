import faggrupper from "./oppdragsinfo/GET_faggrupper.json";
import oppdragsLinjer from "./oppdragsinfo/GET_oppdragslinjer.json";
import oppdrag from "./oppdragsinfo/POST_oppdrag.json";
import oppdragsEnehter from "./oppdragsinfo/GET_oppdrag_enheter.json";
import enhetshistorikk from "./oppdragsinfo/popups/GET_enhetshistorikk.json";
import statushistorikk from "./oppdragsinfo/popups/GET_statushistorikk.json";
import omposteringer from "./oppdragsinfo/popups/GET_omposteringer.json";
import attestant from "./oppdragsinfo/popups/linje/GET_attestant.json";
import detaljer from "./oppdragsinfo/popups/linje/GET_detaljer.json";
import enhet from "./oppdragsinfo/popups/linje/GET_enhet.json";
import grad from "./oppdragsinfo/popups/linje/GET_grad.json";
import kidliste from "./oppdragsinfo/popups/linje/GET_kidliste.json";
import kravhaver from "./oppdragsinfo/popups/linje/GET_kravhaver.json";
import maksdato from "./oppdragsinfo/popups/linje/GET_maksdato.json";
import ovrig from "./oppdragsinfo/popups/linje/GET_ovrig.json";
import skyldner from "./oppdragsinfo/popups/linje/GET_skyldner.json";
import status from "./oppdragsinfo/popups/linje/GET_status.json";
import tekst from "./oppdragsinfo/popups/linje/GET_tekst.json";
import valuta from "./oppdragsinfo/popups/linje/GET_valuta.json";
import gjelderNavn from "./oppdragsinfo/POST_gjelderNavn.json";

export default [
  {
    method: "POST",
    url: "/oppdrag-api/api/v1/integration/hentnavn",
    response: () => gjelderNavn
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/faggrupper",
    /*............*/ response: () => faggrupper
  },
  {
    method: "POST",
    /*....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/sok",
    /*...............*/ response: () => oppdrag
  },
  {
    method: "GET",
    /*....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/oppdragsLinjer",
    /*...................*/ response: () => oppdragsLinjer
  },
  {
    method: "GET",
    /*....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/enheter",
    /*...................*/ response: () => oppdragsEnehter
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/enhetshistorikk",
    /*...*/ response: () => enhetshistorikk
  },
  {
    method: "GET",
    /*....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/omposteringer",
    /*.....*/ response: () => omposteringer
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/statushistorikk",
    /*..*/ response: () => statushistorikk
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/attestanter",
    /**/ response: () => attestant
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/detaljer",
    /*.*/ response: () => detaljer
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/enheter",
    /*....*/ response: () => enhet
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/grader",
    /*.....*/ response: () => grad
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kid",
    /*.*/ response: () => kidliste
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kravhavere",
    /**/ response: () => kravhaver
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/maksdatoer",
    /*.*/ response: () => maksdato
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/ovrig",
    /*....*/ response: () => ovrig
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/skyldnere",
    /*.*/ response: () => skyldner
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/statuser",
    /*...*/ response: () => status
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/tekster",
    /*....*/ response: () => tekst
  },
  {
    method: "GET",
    /*.....*/ url: "/oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/valutaer",
    /*...*/ response: () => valuta
  }
];

import faggrupper from './oppdragsinfo/GET_faggrupper.json';
import oppdragSok from './oppdragsinfo/POST_treffliste.json';
import oppdrag from './oppdragsinfo/POST_oppdrag.json';
import enhetshistorikk from './oppdragsinfo/popups/GET_enhetshistorikk.json';
import omposteringer from './oppdragsinfo/popups/POST_omposteringer.json';
import statushistorikk from './oppdragsinfo/popups/GET_statushistorikk.json';
import attestant from './oppdragsinfo/popups/linje/GET_attestant.json';
import detaljer from './oppdragsinfo/popups/linje/GET_detaljer.json';
import enhet from './oppdragsinfo/popups/linje/GET_enhet.json';
import grad from './oppdragsinfo/popups/linje/GET_grad.json';
import kidliste from './oppdragsinfo/popups/linje/GET_kidliste.json';
import kravhaver from './oppdragsinfo/popups/linje/GET_kravhaver.json';
import maksdato from './oppdragsinfo/popups/linje/GET_maksdato.json';
import ovrig from './oppdragsinfo/popups/linje/GET_ovrig.json';
import skyldner from './oppdragsinfo/popups/linje/GET_skyldner.json';
import status from './oppdragsinfo/popups/linje/GET_status.json';
import tekst from './oppdragsinfo/popups/linje/GET_tekst.json';
import valuta from './oppdragsinfo/popups/linje/GET_valuta.json';

export default [
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/faggrupper", /*............*/ response: () => faggrupper},
  {method: "POST", /*....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/oppdrag", /*...............*/ response: () => oppdragSok},
  {method: "POST", /*....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id", /*...................*/ response: () => oppdrag},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/enhetshistorikk", /*...*/ response: () => enhetshistorikk},
  {method: "POST", /*....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/omposteringer", /*.....*/ response: () => omposteringer},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/statusshistorikk", /*..*/ response: () => statushistorikk},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/attestant", /**/ response: () => attestant},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/detaljer", /*.*/ response: () => detaljer},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/enhet", /*....*/ response: () => enhet},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/grad", /*.....*/ response: () => grad},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kidliste", /*.*/ response: () => kidliste},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/kravhaver", /**/ response: () => kravhaver},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/maksdato", /*.*/ response: () => maksdato},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/ovrig", /*....*/ response: () => ovrig},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/skyldner", /*.*/ response: () => skyldner},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/status", /*...*/ response: () => status},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/tekst", /*....*/ response: () => tekst},
  {method: "GET", /*.....*/ url: "/nav-oppdrag-api/api/v1/oppdragsinfo/:id/:linjeid/valuta", /*...*/ response: () => valuta},
];



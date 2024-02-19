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
  {method: "GET", url: "/oppdragsinfo/api/faggrupper", response: () => faggrupper},
  {method: "POST", url: "/oppdragsinfo/api/oppdrag", response: () => oppdragSok},
  {method: "POST", url: "/oppdragsinfo/api/:id", response: () => oppdrag},
  {method: "GET", url: "/oppdragsinfo/api/:id/enhetshistorikk", response: () => enhetshistorikk},
  {method: "POST", url: "/oppdragsinfo/api/:id/omposteringer", response: () => omposteringer},
  {method: "GET", url: "/oppdragsinfo/api/:id/statusshistorikk", response: () => statushistorikk},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/attestant", response: () => attestant},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/detaljer", response: () => detaljer},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/enhet", response: () => enhet},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/grad", response: () => grad},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/kidliste", response: () => kidliste},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/kravhaver", response: () => kravhaver},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/maksdato", response: () => maksdato},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/ovrig", response: () => ovrig},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/skyldner", response: () => skyldner},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/status", response: () => status},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/tekst", response: () => tekst},
  {method: "GET", url: "/oppdragsinfo/api/:id/:linjeid/valuta", response: () => valuta},
];



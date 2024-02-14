import faggrupper from './oppdragsinfo/GET_faggrupper.json';
import oppdragSok from './oppdragsinfo/POST_oppdrag_search.json';
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
  {method: "POST", url: "/oppdragsinfo/api/1", response: () => oppdrag},
  {method: "GET", url: "/oppdragsinfo/api/1/enhetshistorikk", response: () => enhetshistorikk},
  {method: "POST", url: "/oppdragsinfo/api/1/omposteringer", response: () => omposteringer},
  {method: "GET", url: "/oppdragsinfo/api/1/statusshistorikk", response: () => statushistorikk},
  {method: "GET", url: "/oppdragsinfo/api/1/1/attestant", response: () => attestant},
  {method: "GET", url: "/oppdragsinfo/api/1/1/detaljer", response: () => detaljer},
  {method: "GET", url: "/oppdragsinfo/api/1/1/enhet", response: () => enhet},
  {method: "GET", url: "/oppdragsinfo/api/1/1/grad", response: () => grad},
  {method: "GET", url: "/oppdragsinfo/api/1/1/kidliste", response: () => kidliste},
  {method: "GET", url: "/oppdragsinfo/api/1/1/kravhaver", response: () => kravhaver},
  {method: "GET", url: "/oppdragsinfo/api/1/1/maksdato", response: () => maksdato},
  {method: "GET", url: "/oppdragsinfo/api/1/1/ovrig", response: () => ovrig},
  {method: "GET", url: "/oppdragsinfo/api/1/1/skyldner", response: () => skyldner},
  {method: "GET", url: "/oppdragsinfo/api/1/1/status", response: () => status},
  {method: "GET", url: "/oppdragsinfo/api/1/1/tekst", response: () => tekst},
  {method: "GET", url: "/oppdragsinfo/api/1/1/valuta", response: () => valuta},
];



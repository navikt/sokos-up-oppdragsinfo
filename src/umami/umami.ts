export const SOK = {
  SUBMIT: "søkeknapp trykket",
  RESET: "søk resatt",
  HELP: "hjelp trykket",
};

export const BREADCRUMBS = {
  LINK: "link trykket",
  RESET: "søk resatt",
};

export const TABLE = {
  SORTER: "sortert",
};

export const OPPDRAG = {
  ATTESTERT_MODAL_OPENED: "attestertmodal åpnet",
  STATUS_MODAL_OPENED: "statusmodal åpnet",
  EKSPORT_TIL_EXCEL: "eksportert til excel",
  ENHETSHISTORIKK: "enhetshistorikk åpnet",
  OMPOSTERINGER: "omposteringer åpnet",
  STATUS_HISTORIKK: "statushistorikk åpnet",
};

export const LINJE = {
  ACCORDION_TOGGLED: "accordion togglet",
};

export const ROWS_PER_PAGE = {
  SELECT: "antall per side valgt",
};

export function logUserEvent(name: string, data?: object): void {
  window?.umami?.track(name, data);
}

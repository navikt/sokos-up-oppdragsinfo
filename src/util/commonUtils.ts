import { isArray, isNumber, isSymbol } from "@grafana/faro-web-sdk";
import { UNSAFE_Combobox } from "@navikt/ds-react";
import { Faggruppe, FaggruppeStorageObject } from "../models/Faggruppe";
import { Treffliste } from "../models/Treffliste";

export const isEmpty = (array: Array<unknown> | undefined | null) =>
  !array || !Array.isArray(array) || !array.length;

export const isString = (s?: string | null): s is string => !!s && s !== "";

export const capitalized = (s: string) =>
  s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();

export const Combobox = UNSAFE_Combobox;

export const getTime = () => {
  const dato = new Date();
  return `${dato.toLocaleDateString()} ${dato.toLocaleTimeString()},${dato.getMilliseconds()}`;
};

export const storeId = (id?: string) =>
  id
    ? sessionStorage.setItem("oppdragsinfo_gId", btoa(id))
    : sessionStorage.removeItem("oppdragsinfo_gId");
export const retrieveId = () => retrieveFromStorage("oppdragsinfo_gId") ?? "";
export const clearId = () => storeId();

export const storeFaggruppe = (faggruppe?: Faggruppe) =>
  faggruppe
    ? sessionStorage.setItem(
        "oppdragsinfo_faggruppe",
        btoa(JSON.stringify(faggruppe)),
      )
    : sessionStorage.removeItem("oppdragsinfo_faggruppe");
export const clearFaggruppe = () => {
  storeFaggruppe();
};
export const retrieveFaggruppe = () => {
  const json = retrieveFromStorage("oppdragsinfo_faggruppe");
  if (json === null) return null;
  return JSON.parse(json) as FaggruppeStorageObject;
};
export const retrieveFromStorage = (key: string) => {
  const storedCoded = sessionStorage.getItem(key);
  if (storedCoded === null) return null;
  else return atob(storedCoded);
};

export const comparator = <T>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy] || b[orderBy] === undefined) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const handleSort = <T>(
  sortKey: keyof T,
  setSort: (ss?: SortState<T> | undefined) => void,
  sort?: SortState<T>,
) => {
  setSort(
    sort && sortKey === sort.orderBy && sort.direction === "descending"
      ? undefined
      : {
          orderBy: sortKey,
          direction:
            sort && sortKey === sort.orderBy && sort.direction === "ascending"
              ? "descending"
              : "ascending",
        },
  );
};

export const hasKey = <T extends object>(
  o: T,
  key: string | number | symbol | undefined,
): key is keyof T => {
  if (!key) return false;
  if (isNumber(key)) return false;
  if (isSymbol(key)) return false;
  return Object.keys(o).includes(key);
};

export const formatDate = (date$: string) => {
  if (!date$ || date$ === "") return "";
  const date = new Date(date$);
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${d}.${m}.${y}`;
};

export interface SortState<T> {
  orderBy: keyof T;
  direction: "ascending" | "descending";
}

export const firstOf = <T>(ar: Array<T>) => ar.reduce((a) => a);

export const anyOppdragExists = (
  treffliste?: Treffliste,
): treffliste is Treffliste => {
  if (!treffliste) return false;
  if (!isArray(treffliste) || isEmpty(treffliste)) return false;
  const oppdragsliste = treffliste.flatMap((t) => t.oppdragsListe);
  if (isEmpty(oppdragsliste)) return false;
  return true;
};

export const applySortDirection =
  <T>(sort?: SortState<T>) =>
  (a: T, b: T) => {
    if (sort) {
      return sort.direction === "ascending"
        ? comparator<T>(b, a, sort.orderBy)
        : comparator<T>(a, b, sort.orderBy);
    }
    return 1;
  };

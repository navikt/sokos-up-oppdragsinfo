import { UNSAFE_Combobox } from "@navikt/ds-react";

export const isEmpty = (array: Array<unknown> | undefined | null) => !array || !Array.isArray(array) || !array.length;

export const isString = (s?: string | null) => !!s && s !== "";

export const capitalized = (s: string) => s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();

export const Combobox = UNSAFE_Combobox;

export const getTime = () => {
  const dato = new Date();
  return `${dato.toLocaleDateString()} ${dato.toLocaleTimeString()},${dato.getMilliseconds()}`;
};

export const storeId = (id?: string) => sessionStorage.setItem("oppdragsinfo_gId", btoa(id ?? ""));
export const retrieveId = () => {
  const storedCoded = sessionStorage.getItem("oppdragsinfo_gId");
  if (storedCoded === null) return "";
  else return atob(storedCoded);
};

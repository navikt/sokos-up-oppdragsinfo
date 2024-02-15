import { UNSAFE_Combobox } from "@navikt/ds-react";

export const isEmpty = (array: Array<unknown> | undefined | null) => !array || !Array.isArray(array) || !array.length;

export const capitalized = (s: string) => s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();

export const Combobox = UNSAFE_Combobox;

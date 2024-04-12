import { z } from "zod";

const isoDateFormat = /^\d{4}-(0\d|1[12])-([012]\d|3[01])$/;
const norwegianDateFormat = /^([012]\d|3[01])\.(0\d|1[12])\.\d{4}$/;

export const IsoDateSchema = z.string().refine((value) => isoDateFormat.test(value), {
  message: "Must be an ISO date (YYYY-MM-DD)",
});
const NorwegianDateSchema = z.string().refine((value) => norwegianDateFormat.test(value), {
  message: "Must be a Norwegian date (DD.MM.YYYY)",
});

export const DateSchema = z.string().refine((dato) => isoDateFormat.test(dato) || norwegianDateFormat.test(dato), {
  message: "Should be either ISO or Norwegian date",
});

export type NorwegianDate = z.infer<typeof NorwegianDateSchema>;
export type IsoDate = z.infer<typeof IsoDateSchema>;
export type Date = z.infer<typeof DateSchema>;

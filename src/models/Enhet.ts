import { z } from "zod";
import { DateSchema } from "./Date";

export const enhetstyper = ["BEH", "BOS", "ANKE"] as const;
export type Enhetstype = (typeof enhetstyper)[number];

export const EnhetSchema = z.object({
  type: z.enum(enhetstyper),
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer)),
});

export type Enhet = z.infer<typeof EnhetSchema>;
export type BehandlendeEnhet = z.infer<typeof EnhetSchema>;

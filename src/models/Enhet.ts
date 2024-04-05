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

export const experimentEnhet = EnhetSchema.safeParse({
  type: "BOS",
  datoFom: "01.01.1234",
  enhet: "1232",
});

// const melding = foo.success ? JSON.stringify(foo.data) : foo.error.message

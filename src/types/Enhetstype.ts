import { z } from "zod";
import { DateSchema } from "./Date";

const _EnhetstypeEnum = z.enum(["BEH", "BOS", "ANKE"]);

export const EnhetstypeSchema = z.object({
  type: _EnhetstypeEnum,
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer)),
});

export type EnhetstypeEnum = z.infer<typeof _EnhetstypeEnum>;
export type Enhetstype = z.infer<typeof EnhetstypeSchema>;

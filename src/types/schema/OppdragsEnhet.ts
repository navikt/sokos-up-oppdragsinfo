import { z } from "zod";
import { DateSchema } from "./DateSchema";

export const OppdragsEnhetTypeSchema = z.enum(["BEH", "BOS", "ANKE"]);

export const OppdragsEnhetSchema = z.object({
  typeEnhet: OppdragsEnhetTypeSchema,
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer)),
});

export const OppdragsEnhetListSchema = z.array(OppdragsEnhetSchema);

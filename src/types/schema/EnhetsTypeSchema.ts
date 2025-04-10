import { z } from "zod";
import { DateSchema } from "./DateSchema";

export const EnhetsTypeSchema = z.enum(["BEH", "BOS", "ANKE"]);

export const EnhetSchema = z.object({
  typeEnhet: EnhetsTypeSchema,
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer)),
});

export const EnhetListSchema = z.array(EnhetSchema);

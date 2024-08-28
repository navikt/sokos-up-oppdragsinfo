import { z } from "zod";
import { DateSchema } from "./Date";

const _EnhetsTypeEnum = z.enum(["BEH", "BOS", "ANKE"]);

export const EnhetsTypeSchema = z.object({
  type: _EnhetsTypeEnum,
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer)),
});

export type EnhetsTypeEnum = z.infer<typeof _EnhetsTypeEnum>;
export type EnhetsType = z.infer<typeof EnhetsTypeSchema>;

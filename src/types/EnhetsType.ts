import { z } from "zod";
import { DateSchema } from "./Date";

const EnhetsTypeEnum = z.enum(["BEH", "BOS", "ANKE"]);

export const EnhetsTypeSchema = z.object({
  type: EnhetsTypeEnum,
  datoFom: DateSchema,
  enhet: z.string().refine((enhetsnummer) => /^\d{4}$/.test(enhetsnummer))
});

export type EnhetsTypeEnum = z.infer<typeof EnhetsTypeEnum>;
export type EnhetsType = z.infer<typeof EnhetsTypeSchema>;



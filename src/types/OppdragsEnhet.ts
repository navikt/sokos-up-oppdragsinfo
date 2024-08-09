import { z } from "zod";
import { EnhetsTypeSchema } from "./EnhetsType";

const OppdragsEnhetSchema = z.object({
  enhet: EnhetsTypeSchema,
  behandlendeEnhet: EnhetsTypeSchema
});

export type OppdragsEnhet = z.infer<typeof OppdragsEnhetSchema>;
import { z } from "zod";
import { EnhetsTypeSchema } from "./EnhetsTypeSchema";

export const OppdragsEnhetSchema = z.object({
  enhet: EnhetsTypeSchema,
  behandlendeEnhet: EnhetsTypeSchema,
});

import { z } from "zod";
import { EnhetSchema } from "./EnhetsTypeSchema";

export const OppdragsEnhetSchema = z.object({
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
});

import { z } from "zod";
import { EnhetSchema } from "./EnhetsTypeSchema";

export const OppdragsEnhetDTOSchema = z.object({
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
});

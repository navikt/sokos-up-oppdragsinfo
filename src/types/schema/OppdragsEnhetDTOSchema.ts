import { z } from "zod";
import { EnhetSchema } from "./OppdragsEnhet";

export const OppdragsEnhetDTOSchema = z.object({
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
});

import { z } from "zod";
import { OppdragsEnhetSchema } from "./OppdragsEnhet";

export const OppdragsEnhetDTOSchema = z.object({
  enhet: OppdragsEnhetSchema,
  behandlendeEnhet: OppdragsEnhetSchema,
});

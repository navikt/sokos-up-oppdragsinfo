import { z } from "zod";
import { EnhetsTypeSchema } from "./EnhetsType";

const _OppdragsEnhetSchema = z.object({
  enhet: EnhetsTypeSchema,
  behandlendeEnhet: EnhetsTypeSchema,
});

export type OppdragsEnhet = z.infer<typeof _OppdragsEnhetSchema>;

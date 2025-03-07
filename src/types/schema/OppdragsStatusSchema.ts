import { z } from "zod";

export const OppdragsStatusSchema = z.object({
  kodeStatus: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const OppdragsStatusListSchema = z.array(OppdragsStatusSchema);

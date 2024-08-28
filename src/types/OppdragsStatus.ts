import { z } from "zod";

const _OppdragsStatusSchema = z.object({
  kodeStatus: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _OppdragsStatuserSchema = z.array(_OppdragsStatusSchema);

export type OppdragsStatus = z.infer<typeof _OppdragsStatusSchema>;

export type OppdragsStatuser = z.infer<typeof _OppdragsStatuserSchema>;

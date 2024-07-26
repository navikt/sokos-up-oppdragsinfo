import { z } from "zod";

const OppdragsStatusSchema = z.object({
  kodeStatus: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string()
});

const OppdragsStatuserSchema = z.array(OppdragsStatusSchema);

export type OppdragsStatus = z.infer<typeof OppdragsStatusSchema>;

export type OppdragsStatuser = z.infer<typeof OppdragsStatuserSchema>;

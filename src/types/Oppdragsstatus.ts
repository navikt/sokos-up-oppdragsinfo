import { z } from "zod";

const _OppdragsstatusSchema = z.object({
  kodeStatus: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _OppdragsstatuserSchema = z.array(_OppdragsstatusSchema);

export type Oppdragsstatus = z.infer<typeof _OppdragsstatusSchema>;

export type Oppdragsstatuser = z.infer<typeof _OppdragsstatuserSchema>;

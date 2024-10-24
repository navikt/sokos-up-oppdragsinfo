import { z } from "zod";

export const StatusSchema = z.object({
  status: z.string(),
  datoFom: z.optional(z.string()),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const StatusListSchema = z.array(StatusSchema);

import { z } from "zod";

export const LinjeStatusSchema = z.object({
  status: z.string(),
  datoFom: z.optional(z.string()),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const LinjeStatusListSchema = z.array(LinjeStatusSchema);

import { z } from "zod";

export const LinjeEnhetSchema = z.object({
  linjeId: z.string(),
  typeEnhet: z.string(),
  enhet: z.string().optional(),
  datoFom: z.string(),
  nokkelId: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const LinjeEnhetListSchema = z.array(LinjeEnhetSchema);

import { z } from "zod";

export const LinjeEnhetSchema = z.object({
  linjeId: z.string(),
  typeEnhet: z.string(),
  enhet: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const LinjeEnheterSchema = z.array(LinjeEnhetSchema);

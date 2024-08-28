import { z } from "zod";

const _LinjeEnhetSchema = z.object({
  linjeId: z.string(),
  typeEnhet: z.string(),
  enhet: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _LinjeEnheterSchema = z.array(_LinjeEnhetSchema);

export type LinjeEnhet = z.infer<typeof _LinjeEnhetSchema>;

export type Linjeenheter = z.infer<typeof _LinjeEnheterSchema>;

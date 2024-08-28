import { z } from "zod";

export const _ValutaSchema = z.object({
  linjeId: z.string(),
  type: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  valuta: z.string(),
  feilreg: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _ValutaerSchema = z.array(_ValutaSchema);

export type Valuta = z.infer<typeof _ValutaSchema>;

export type Valutaer = z.infer<typeof _ValutaerSchema>;

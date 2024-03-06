import { z } from "zod";

export const ValutaSchema = z.object({
  linjeId: z.string(),
  type: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  valuta: z.string(),
  feilreg: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const ValutaerSchema = z.array(ValutaSchema);

export type Valuta = z.infer<typeof ValutaSchema>;

export type Valutaer = z.infer<typeof ValutaerSchema>;

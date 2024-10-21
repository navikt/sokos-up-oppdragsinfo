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

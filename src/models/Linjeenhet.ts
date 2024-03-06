import { z } from "zod";

export const LinjeenhetSchema = z.object({
  linjeId: z.string(),
  typeEnhet: z.string(),
  enhet: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const LinjeenheterSchema = z.array(LinjeenhetSchema);

export type Linjeenhet = z.infer<typeof LinjeenhetSchema>;

export type Linjeenheter = z.infer<typeof LinjeenheterSchema>;

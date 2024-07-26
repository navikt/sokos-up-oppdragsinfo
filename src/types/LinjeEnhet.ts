import { z } from "zod";

const LinjeEnhetSchema = z.object({
  linjeId: z.string(),
  typeEnhet: z.string(),
  enhet: z.string(),
  datoFom: z.string(),
  nokkelId: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string()
});

const LinjeEnheterSchema = z.array(LinjeEnhetSchema);

export type LinjeEnhet = z.infer<typeof LinjeEnhetSchema>;

export type Linjeenheter = z.infer<typeof LinjeEnheterSchema>;

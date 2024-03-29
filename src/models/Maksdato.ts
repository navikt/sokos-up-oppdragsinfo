import { z } from "zod";

export const MaksdatoSchema = z.object({
  linjeId: z.string(),
  maksdato: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const MaksdatoerSchema = z.array(MaksdatoSchema);

export type Maksdato = z.infer<typeof MaksdatoSchema>;

export type Maksdatoer = z.infer<typeof MaksdatoerSchema>;

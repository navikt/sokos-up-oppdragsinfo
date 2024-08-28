import { z } from "zod";

const _MaksdatoSchema = z.object({
  linjeId: z.string(),
  maksdato: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _MaksdatoerSchema = z.array(_MaksdatoSchema);

export type Maksdato = z.infer<typeof _MaksdatoSchema>;

export type Maksdatoer = z.infer<typeof _MaksdatoerSchema>;

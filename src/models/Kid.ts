import { z } from "zod";

export const KidSchema = z.object({
  linjeId: z.string(),
  kid: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const KidlisteSchema = z.array(KidSchema);

export type Kid = z.infer<typeof KidSchema>;

export type Kidliste = z.infer<typeof KidlisteSchema>;

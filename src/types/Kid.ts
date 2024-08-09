import { z } from "zod";

const KidSchema = z.object({
  linjeId: z.string(),
  kid: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string()
});

const KidListeSchema = z.array(KidSchema);

export type Kid = z.infer<typeof KidSchema>;

export type KidListe = z.infer<typeof KidListeSchema>;

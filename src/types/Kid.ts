import { z } from "zod";

const _KidSchema = z.object({
  linjeId: z.string(),
  kid: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _KidListeSchema = z.array(_KidSchema);

export type Kid = z.infer<typeof _KidSchema>;

export type KidListe = z.infer<typeof _KidListeSchema>;

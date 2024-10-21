import { z } from "zod";

export const KidSchema = z.object({
  linjeId: z.string(),
  kid: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const KidListeSchema = z.array(KidSchema);

import { z } from "zod";

const _KravhaverSchema = z.object({
  linjeId: z.string(),
  kravhaverId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _KravhavereSchema = z.array(_KravhaverSchema);

export type Kravhaver = z.infer<typeof _KravhaverSchema>;

export type Kravhavere = z.infer<typeof _KravhavereSchema>;

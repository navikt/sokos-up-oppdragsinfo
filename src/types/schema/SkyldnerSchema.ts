import { z } from "zod";

export const SkyldnerSchema = z.object({
  linjeId: z.string(),
  skyldnerId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const SkyldnereSchema = z.array(SkyldnerSchema);

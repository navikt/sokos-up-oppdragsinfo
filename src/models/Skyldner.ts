import { z } from "zod";

export const SkyldnerSchema = z.object({
  linjeId: z.string(),
  skyldnerId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const SkyldnersListSchema = z.array(SkyldnerSchema);

export type Skyldner = z.infer<typeof SkyldnerSchema>;

export type SkyldnersList = z.infer<typeof SkyldnersListSchema>;

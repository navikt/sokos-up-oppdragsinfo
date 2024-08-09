import { z } from "zod";

const SkyldnerSchema = z.object({
  linjeId: z.string(),
  skyldnerId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string()
});

const SkyldnereSchema = z.array(SkyldnerSchema);

export type Skyldner = z.infer<typeof SkyldnerSchema>;

export type Skyldnere = z.infer<typeof SkyldnereSchema>;

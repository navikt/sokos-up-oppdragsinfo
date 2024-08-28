import { z } from "zod";

const _SkyldnerSchema = z.object({
  linjeId: z.string(),
  skyldnerId: z.string(),
  datoFom: z.string(),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _SkyldnereSchema = z.array(_SkyldnerSchema);

export type Skyldner = z.infer<typeof _SkyldnerSchema>;

export type Skyldnere = z.infer<typeof _SkyldnereSchema>;

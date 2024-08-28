import { z } from "zod";

const _StatusSchema = z.object({
  status: z.string(),
  datoFom: z.optional(z.string()),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _StatuserSchema = z.array(_StatusSchema);

export type Status = z.infer<typeof _StatusSchema>;

export type Statuser = z.infer<typeof _StatuserSchema>;

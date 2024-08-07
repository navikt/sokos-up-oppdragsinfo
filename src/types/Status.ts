import { z } from "zod";

const StatusSchema = z.object({
  status: z.string(),
  datoFom: z.optional(z.string()),
  tidspktReg: z.string(),
  brukerid: z.string()
});

const StatuserSchema = z.array(StatusSchema);

export type Status = z.infer<typeof StatusSchema>;

export type Statuser = z.infer<typeof StatuserSchema>;

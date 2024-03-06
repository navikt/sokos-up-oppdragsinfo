import { z } from "zod";

export const EnhetSchema = z.object({
  type: z.string(),
  datoFom: z.string(),
  enhet: z.string(),
});

export type Enhet = z.infer<typeof EnhetSchema>;
export type BehandlendeEnhet = z.infer<typeof EnhetSchema>;

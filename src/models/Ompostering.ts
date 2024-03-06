import { z } from "zod";

export const OmposteringSchema = z.object({
  id: z.number().int(),
  kodeFaggruppe: z.string(),
  lopenr: z.string(),
  ompostering: z.string(),
  omposteringFom: z.string(),
  feilReg: z.string(),
  beregningsId: z.string(),
  utfort: z.string(),
  brukerid: z.string(),
  tidspktReg: z.string(),
});

export const OmposteringerSchema = z.array(OmposteringSchema);

export type Ompostering = z.infer<typeof OmposteringSchema>;
export type Omposteringer = z.infer<typeof OmposteringerSchema>;

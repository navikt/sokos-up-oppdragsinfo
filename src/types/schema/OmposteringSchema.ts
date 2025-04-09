import { z } from "zod";

export const OmposteringSchema = z.object({
  id: z.number().int(),
  kodeFaggruppe: z.string(),
  lopenr: z.string(),
  ompostering: z.string(),
  datoOmposterFom: z.string(),
  feilReg: z.string(),
  beregningsId: z.string(),
  utfort: z.string(),
  brukerid: z.string(),
  tidspktReg: z.string(),
});

export const OmposteringListSchema = z.array(OmposteringSchema);

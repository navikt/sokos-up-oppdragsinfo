import { z } from "zod";
import { EnhetSchema } from "./Enhet";
import { OppdragsegenskaperSchema } from "./Oppdragegenskaper";
import { OppdragslinjeSchema } from "./Oppdragslinje";

export const OppdragSchema = z.object({
  oppdragsegenskaper: OppdragsegenskaperSchema,
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
  harOmposteringer: z.boolean(),
  oppdragsLinjer: z.array(OppdragslinjeSchema),
});

export type Oppdrag = z.infer<typeof OppdragSchema>;

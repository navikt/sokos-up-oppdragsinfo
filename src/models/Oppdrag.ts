import { z } from "zod";
import { EnhetSchema } from "./Enhet";
import { OppdragsEgenskapSchema } from "./OppdragsEgenskaper";
import { OppdragsLinjeSchema } from "./Oppdragslinje";

export const OppdragSchema = z.object({
  oppdragsegenskaper: OppdragsEgenskapSchema,
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
  harOmposteringer: z.boolean(),
  oppdragsLinjer: z.array(OppdragsLinjeSchema),
});

export type Oppdrag = z.infer<typeof OppdragSchema>;

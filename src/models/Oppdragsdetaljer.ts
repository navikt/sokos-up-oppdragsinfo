import { z } from "zod";
import { EnhetSchema } from "./Enhet";
import { OppdragslinjeSchema } from "./Oppdragslinje";

export const OppdragsdetaljerSchema = z.object({
  enhet: EnhetSchema,
  behandlendeEnhet: EnhetSchema,
  harOmposteringer: z.boolean(),
  oppdragsLinjer: z.array(OppdragslinjeSchema),
});

export type Oppdragsdetaljer = z.infer<typeof OppdragsdetaljerSchema>;

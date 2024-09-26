import { z } from "zod";
import { EnhetstypeSchema } from "./Enhetstype";

const _OppdragsenhetSchema = z.object({
  enhet: EnhetstypeSchema,
  behandlendeEnhet: EnhetstypeSchema,
});

export type Oppdragsenhet = z.infer<typeof _OppdragsenhetSchema>;

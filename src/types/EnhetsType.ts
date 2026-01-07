import type { z } from "zod";
import type {
	OppdragsEnhetSchema,
	OppdragsEnhetTypeSchema,
} from "./schema/OppdragsEnhet";

export type EnhetsType = z.infer<typeof OppdragsEnhetTypeSchema>;
export type Enhet = z.infer<typeof OppdragsEnhetSchema>;

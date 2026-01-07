import type { z } from "zod";
import type {
	AttestantListSchema,
	AttestantSchema,
} from "./schema/AttestantSchema";

export type Attestant = z.infer<typeof AttestantSchema>;

export type AttestantList = z.infer<typeof AttestantListSchema>;

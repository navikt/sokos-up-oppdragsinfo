import { z } from "zod";
import { AttestantListSchema, AttestantSchema } from "./schema/AttestantSchema";

export type Attestant = z.infer<typeof AttestantSchema>;

export type AttestantList = z.infer<typeof AttestantListSchema>;

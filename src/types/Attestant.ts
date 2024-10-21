import { z } from "zod";
import { AttestantSchema, AttestanterSchema } from "./schema/AttestantSchema";

export type Attestant = z.infer<typeof AttestantSchema>;

export type Attestanter = z.infer<typeof AttestanterSchema>;

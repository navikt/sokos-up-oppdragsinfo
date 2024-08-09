import { z } from "zod";
import { DateSchema } from "./Date";

const AttestantSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: DateSchema
});

const AttestanterSchema = z.array(AttestantSchema);

export type Attestant = z.infer<typeof AttestantSchema>;

export type Attestanter = z.infer<typeof AttestanterSchema>;

import { z } from "zod";
import { DateSchema } from "./Date";

export const AttestantSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: DateSchema,
});

export const AttestanterSchema = z.array(AttestantSchema);

export type Attestant = z.infer<typeof AttestantSchema>;

export type Attestanter = z.infer<typeof AttestanterSchema>;

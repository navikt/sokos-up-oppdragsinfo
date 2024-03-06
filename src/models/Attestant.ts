import { z } from "zod";

export const AttestantSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: z.string(),
});

export const AttestanterSchema = z.array(AttestantSchema);

export type Attestant = z.infer<typeof AttestantSchema>;

export type Attestanter = z.infer<typeof AttestanterSchema>;

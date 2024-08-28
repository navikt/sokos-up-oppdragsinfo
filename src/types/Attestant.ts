import { z } from "zod";
import { DateSchema } from "./Date";

const _AttestantSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: DateSchema,
});

const _AttestanterSchema = z.array(_AttestantSchema);

export type Attestant = z.infer<typeof _AttestantSchema>;

export type Attestanter = z.infer<typeof _AttestanterSchema>;

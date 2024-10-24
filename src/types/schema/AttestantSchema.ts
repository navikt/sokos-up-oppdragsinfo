import { z } from "zod";
import { DateSchema } from "./DateSchema";

export const AttestantSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: DateSchema,
});

export const AttestantListSchema = z.array(AttestantSchema);

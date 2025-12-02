import { z } from "zod";

export const BestilleSkattekortRequestSchema = z.object({
  gjelderId: z.string(),
  inntektsaar: z.int(),
});

export type BestilleSkattekortRequest = z.infer<
  typeof BestilleSkattekortRequestSchema
>;

import { z } from "zod";
import { GjelderIdSchema } from "./GjelderId";

export const SokParameterSchema = z.object({
  gjelderId: GjelderIdSchema,
  fagGruppeKode: z.string().optional(),
});

export type SokParameter = z.infer<typeof SokParameterSchema>;

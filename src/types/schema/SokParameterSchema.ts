import { z } from "zod";
import { GjelderIdSchema } from "./GjelderIdSchema";

export const SokParameterSchema = z.object({
  gjelderId: GjelderIdSchema,
  fagGruppeKode: z.string().optional(),
});

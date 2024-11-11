import { z } from "zod";
import { FagGruppeSchema } from "./FagGruppeSchema";
import { GjelderIdSchema } from "./GjelderIdSchema";

export const SokParameterSchema = z.object({
  gjelderId: GjelderIdSchema,
  fagGruppe: FagGruppeSchema.optional(),
});

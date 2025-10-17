import { z } from "zod";
import { FagGruppeListSchema, FagGruppeSchema } from "./schema/FagGruppeSchema";

export type FagGruppe = z.infer<typeof FagGruppeSchema>;
export type FagGruppeList = z.infer<typeof FagGruppeListSchema>;

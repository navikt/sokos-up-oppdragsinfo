import type { z } from "zod";
import type {
	FagGruppeListSchema,
	FagGruppeSchema,
} from "./schema/FagGruppeSchema";

export type FagGruppe = z.infer<typeof FagGruppeSchema>;
export type FagGruppeList = z.infer<typeof FagGruppeListSchema>;

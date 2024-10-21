import { z } from "zod";
import { FagGruppeSchema, FagGrupperSchema } from "./schema/FagGruppeSchema";

export type FagGruppe = z.infer<typeof FagGruppeSchema>;
export type FagGrupper = z.infer<typeof FagGrupperSchema>;
export type FagGruppeVisning = FagGruppe & {
  comboboxText: string;
};

import { z } from "zod";

const _FagGruppeSchema = z.object({
  navn: z.string(),
  type: z.string(),
});

const _FagGrupperSchema = z.array(_FagGruppeSchema);

export type FagGruppe = z.infer<typeof _FagGruppeSchema>;
export type FagGrupper = z.infer<typeof _FagGrupperSchema>;
export type FagGruppeVisning = FagGruppe & {
  comboboxText: string;
};

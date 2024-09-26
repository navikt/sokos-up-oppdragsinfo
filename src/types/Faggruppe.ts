import { z } from "zod";

const _FaggruppeSchema = z.object({
  navn: z.string(),
  type: z.string(),
});

const _FaggrupperSchema = z.array(_FaggruppeSchema);

export type Faggruppe = z.infer<typeof _FaggruppeSchema>;
export type Faggrupper = z.infer<typeof _FaggrupperSchema>;
export type FaggruppeVisning = Faggruppe & {
  comboboxText: string;
};

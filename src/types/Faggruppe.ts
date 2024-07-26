import { z } from "zod";

const FaggruppeSchema = z.object({
  navn: z.string(),
  type: z.string()
});

const FaggrupperSchema = z.array(FaggruppeSchema);

export type Faggruppe = z.infer<typeof FaggruppeSchema>;
export type Faggrupper = z.infer<typeof FaggrupperSchema>;
export type FaggruppeVisning = Faggruppe & {
  comboboxText: string;
};

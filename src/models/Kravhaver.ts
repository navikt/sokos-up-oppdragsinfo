import { z } from "zod";

export const KravhaverSchema = z.object({
  attestantId: z.string(),
  ugyldigFom: z.string(),
});

export const KravhavereSchema = z.array(KravhaverSchema);

export type Kravhaver = z.infer<typeof KravhaverSchema>;

export type Kravhavere = z.infer<typeof KravhavereSchema>;

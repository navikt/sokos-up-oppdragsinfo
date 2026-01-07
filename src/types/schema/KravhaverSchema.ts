import { z } from "zod";

export const KravhaverSchema = z.object({
	linjeId: z.string(),
	kravhaverId: z.string(),
	datoFom: z.string(),
	tidspktReg: z.string(),
	brukerid: z.string(),
});

export const KravhaverListSchema = z.array(KravhaverSchema);

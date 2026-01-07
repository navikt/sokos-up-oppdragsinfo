import { z } from "zod";

export const LinjeStatusSchema = z.object({
	kodeStatus: z.string(),
	datoFom: z.optional(z.string()),
	tidspktReg: z.string(),
	brukerid: z.string(),
});

export const LinjeStatusListSchema = z.array(LinjeStatusSchema);

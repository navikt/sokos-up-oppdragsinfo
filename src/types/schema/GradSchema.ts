import { z } from "zod";

export const GradSchema = z.object({
	linjeId: z.string(),
	typeGrad: z.string(),
	grad: z.number().int().min(0).max(100),
	tidspktReg: z.string(),
	brukerid: z.string(),
});

export const GradListSchema = z.array(GradSchema);

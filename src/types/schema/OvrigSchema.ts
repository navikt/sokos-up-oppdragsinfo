import { z } from "zod";

export const OvrigSchema = z.object({
	linjeId: z.string(),
	vedtaksId: z.string(),
	henvisning: z.string(),
	typeSoknad: z.string(),
});

export const OvrigListSchema = z.array(OvrigSchema);

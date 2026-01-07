import { z } from "zod";
import { GjelderIdSchema } from "../../types/schema/GjelderIdSchema";

export const GjelderIdRequestSchema = z.object({
	gjelderId: GjelderIdSchema,
});

export type GjelderIdRequest = z.infer<typeof GjelderIdRequestSchema>;

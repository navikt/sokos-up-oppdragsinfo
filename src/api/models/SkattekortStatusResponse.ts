import { z } from "zod";

export const SkattekortStatusResponseSchema = z.object({
	status: z.string(),
});

export type SkattekortStatusResponse = z.infer<
	typeof SkattekortStatusResponseSchema
>;

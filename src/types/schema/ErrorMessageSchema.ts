import { z } from "zod";

export const ErrorMessageSchema = z.object({
	status: z.enum(["error", "warning", "announcement", "success"]),
	message: z.string(),
});

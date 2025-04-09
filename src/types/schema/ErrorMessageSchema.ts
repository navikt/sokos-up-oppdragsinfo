import { z } from "zod";

export const ErrorMessageSchema = z.object({
  variant: z.enum(["error", "warning", "info", "success"]),
  message: z.string(),
});

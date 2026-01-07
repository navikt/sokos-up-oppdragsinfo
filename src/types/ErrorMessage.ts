import type { z } from "zod";
import type { ErrorMessageSchema } from "./schema/ErrorMessageSchema";

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;

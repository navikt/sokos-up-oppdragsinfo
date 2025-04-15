import { z } from "zod";
import { ErrorMessageSchema } from "./schema/ErrorMessageSchema";

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;

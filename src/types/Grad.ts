import type { z } from "zod";
import type { GradListSchema, GradSchema } from "./schema/GradSchema";

export type Grad = z.infer<typeof GradSchema>;
export type GradList = z.infer<typeof GradListSchema>;

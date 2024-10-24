import { z } from "zod";
import { GradListSchema, GradSchema } from "./schema/GradSchema";

export type Grad = z.infer<typeof GradSchema>;
export type GradList = z.infer<typeof GradListSchema>;

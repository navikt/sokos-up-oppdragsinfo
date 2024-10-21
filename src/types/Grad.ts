import { z } from "zod";
import { GradSchema, GraderSchema } from "./schema/GradSchema";

export type Grad = z.infer<typeof GradSchema>;
export type Grader = z.infer<typeof GraderSchema>;

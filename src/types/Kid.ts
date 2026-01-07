import type { z } from "zod";
import type { KidListSchema, KidSchema } from "./schema/KidSchema";

export type Kid = z.infer<typeof KidSchema>;

export type KidList = z.infer<typeof KidListSchema>;

import { z } from "zod";
import { KidListSchema, KidSchema } from "./schema/KidSchema";

export type Kid = z.infer<typeof KidSchema>;

export type KidList = z.infer<typeof KidListSchema>;

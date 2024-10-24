import { z } from "zod";
import { KravhaverListSchema, KravhaverSchema } from "./schema/KravhaverSchema";

export type Kravhaver = z.infer<typeof KravhaverSchema>;

export type KravhaverList = z.infer<typeof KravhaverListSchema>;

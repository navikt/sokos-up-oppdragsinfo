import { z } from "zod";
import { KravhaverSchema, KravhavereSchema } from "./schema/KravhaverSchema";

export type Kravhaver = z.infer<typeof KravhaverSchema>;

export type Kravhavere = z.infer<typeof KravhavereSchema>;

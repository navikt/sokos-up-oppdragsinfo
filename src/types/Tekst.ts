import type { z } from "zod";
import type { TekstListSchema, TekstSchema } from "./schema/TekstSchema";

export type Tekst = z.infer<typeof TekstSchema>;

export type TekstList = z.infer<typeof TekstListSchema>;

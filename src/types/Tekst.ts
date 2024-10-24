import { z } from "zod";
import { TekstListSchema, TekstSchema } from "./schema/TekstSchema";

export type Tekst = z.infer<typeof TekstSchema>;

export type TekstList = z.infer<typeof TekstListSchema>;

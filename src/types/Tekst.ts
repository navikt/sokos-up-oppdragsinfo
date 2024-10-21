import { z } from "zod";
import { TekstSchema, TeksterSchema } from "./schema/TekstSchema";

export type Tekst = z.infer<typeof TekstSchema>;

export type Tekster = z.infer<typeof TeksterSchema>;

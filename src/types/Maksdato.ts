import { z } from "zod";
import { MaksdatoSchema, MaksdatoerSchema } from "./schema/MaksdatoSchema";

export type Maksdato = z.infer<typeof MaksdatoSchema>;

export type Maksdatoer = z.infer<typeof MaksdatoerSchema>;

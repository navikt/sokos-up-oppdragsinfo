import { z } from "zod";
import { KidListeSchema, KidSchema } from "./schema/KidSchema";

export type Kid = z.infer<typeof KidSchema>;

export type KidListe = z.infer<typeof KidListeSchema>;

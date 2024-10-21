import { z } from "zod";
import { GjelderNavnSchema } from "./schema/GjelderNavnSchema";

export type GjelderNavn = z.infer<typeof GjelderNavnSchema>;

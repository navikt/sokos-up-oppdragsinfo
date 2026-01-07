import type { z } from "zod";
import type { GjelderNavnSchema } from "./schema/GjelderNavnSchema";

export type GjelderNavn = z.infer<typeof GjelderNavnSchema>;

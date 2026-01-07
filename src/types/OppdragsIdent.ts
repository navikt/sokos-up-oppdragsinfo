import type { z } from "zod";
import type { OppdragsIdentSchema } from "./schema/OppdragsIdentSchema";

export type OppdragsIdent = z.infer<typeof OppdragsIdentSchema>;

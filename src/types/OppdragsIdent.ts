import { z } from "zod";
import { OppdragsIdentSchema } from "./schema/OppdragsIdentSchema";

export type OppdragsIdent = z.infer<typeof OppdragsIdentSchema>;

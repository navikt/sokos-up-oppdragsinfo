import { z } from "zod";
import { OppdragsIdSchema } from "./schema/OppdragsIdSchema";

export type OppdragsId = z.infer<typeof OppdragsIdSchema>;

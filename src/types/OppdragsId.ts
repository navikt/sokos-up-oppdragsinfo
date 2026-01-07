import type { z } from "zod";
import type { OppdragsIdSchema } from "./schema/OppdragsIdSchema";

export type OppdragsId = z.infer<typeof OppdragsIdSchema>;

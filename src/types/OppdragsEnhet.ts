import type { z } from "zod";
import type { OppdragsEnhetListSchema } from "./schema/OppdragsEnhet";

export type OppdragsEnhetList = z.infer<typeof OppdragsEnhetListSchema>;

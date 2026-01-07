import type { z } from "zod";
import type { OppdragsEnhetDTOSchema } from "./schema/OppdragsEnhetDTOSchema";

export type OppdragsEnhetDTO = z.infer<typeof OppdragsEnhetDTOSchema>;

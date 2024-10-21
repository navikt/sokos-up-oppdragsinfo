import { z } from "zod";
import { OppdragsLinjeDetaljeSchema } from "./schema/OppdragsLinjeDetaljeSchema";

export type OppdragsLinjeDetalje = z.infer<typeof OppdragsLinjeDetaljeSchema>;

import { z } from "zod";
import { OppdragsLinjeDetaljerSchema } from "./schema/OppdragsLinjeDetaljeSchema";

export type OppdragsLinjeDetaljer = z.infer<typeof OppdragsLinjeDetaljerSchema>;

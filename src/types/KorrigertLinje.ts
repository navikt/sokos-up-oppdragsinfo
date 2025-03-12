import { z } from "zod";
import { KorrigertLinjeSchema } from "./schema/OppdragsLinjeDetaljeSchema";

export type KorrigertLinje = z.infer<typeof KorrigertLinjeSchema>;

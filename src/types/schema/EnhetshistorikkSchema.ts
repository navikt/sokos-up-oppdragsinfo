import { z } from "zod";
import { EnhetsTypeSchema } from "../EnhetsType";

export const EnhetshistorikkSchema = z.array(EnhetsTypeSchema);

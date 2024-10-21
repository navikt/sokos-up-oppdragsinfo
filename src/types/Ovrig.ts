import { z } from "zod";
import { OvrigSchema, OvrigeSchema } from "./schema/OvrigSchema";

export type Ovrig = z.infer<typeof OvrigSchema>;
export type Ovrige = z.infer<typeof OvrigeSchema>;

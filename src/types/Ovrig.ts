import { z } from "zod";
import { OvrigListSchema, OvrigSchema } from "./schema/OvrigSchema";

export type Ovrig = z.infer<typeof OvrigSchema>;
export type OvrigList = z.infer<typeof OvrigListSchema>;

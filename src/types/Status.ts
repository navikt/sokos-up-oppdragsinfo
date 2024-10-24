import { z } from "zod";
import { StatusListSchema, StatusSchema } from "./schema/StatusSchema";

export type Status = z.infer<typeof StatusSchema>;

export type StatusList = z.infer<typeof StatusListSchema>;

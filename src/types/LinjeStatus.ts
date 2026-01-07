import type { z } from "zod";
import type {
	LinjeStatusListSchema,
	LinjeStatusSchema,
} from "./schema/LinjeStatusSchema";

export type LinjeStatus = z.infer<typeof LinjeStatusSchema>;

export type LinjeStatusList = z.infer<typeof LinjeStatusListSchema>;

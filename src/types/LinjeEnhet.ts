import type { z } from "zod";
import type {
	LinjeEnhetListSchema,
	LinjeEnhetSchema,
} from "./schema/LinjeEnhetSchema";

export type LinjeEnhet = z.infer<typeof LinjeEnhetSchema>;

export type LinjeenhetList = z.infer<typeof LinjeEnhetListSchema>;

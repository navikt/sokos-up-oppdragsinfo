import type { z } from "zod";
import type {
	OmposteringListSchema,
	OmposteringSchema,
} from "./schema/OmposteringSchema";

export type Ompostering = z.infer<typeof OmposteringSchema>;
export type OmposteringList = z.infer<typeof OmposteringListSchema>;

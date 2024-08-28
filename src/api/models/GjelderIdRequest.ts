import { z } from "zod";

const _GjelderIdRequestSchema = z.object({
  gjelderId: z.string(),
});

export type GjelderIdRequest = z.infer<typeof _GjelderIdRequestSchema>;

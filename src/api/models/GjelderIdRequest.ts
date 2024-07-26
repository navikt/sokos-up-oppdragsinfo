import { z } from "zod";

const GjelderIdRequestSchema = z.object({
  gjelderId: z.string()
});

export type GjelderIdRequest = z.infer<typeof GjelderIdRequestSchema>
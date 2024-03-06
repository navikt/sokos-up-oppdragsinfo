import { z } from "zod";

export const GradSchema = z.object({
  linjeId: z.string(),
  typeGrad: z.string(),
  grad: z.number().int().min(0).max(100),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

export const GraderSchema = z.array(GradSchema);

export type Grad = z.infer<typeof GradSchema>;

export type Grader = z.infer<typeof GraderSchema>;

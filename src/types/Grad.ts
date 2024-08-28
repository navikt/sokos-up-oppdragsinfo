import { z } from "zod";

const _GradSchema = z.object({
  linjeId: z.string(),
  typeGrad: z.string(),
  grad: z.number().int().min(0).max(100),
  tidspktReg: z.string(),
  brukerid: z.string(),
});

const _GraderSchema = z.array(_GradSchema);

export type Grad = z.infer<typeof _GradSchema>;
export type Grader = z.infer<typeof _GraderSchema>;

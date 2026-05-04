import { z } from "zod";

export const empresaSchema = z.object({
  name: z.string().min(2),
  rut: z.string().optional(),
  email: z.string().email().optional(),
});

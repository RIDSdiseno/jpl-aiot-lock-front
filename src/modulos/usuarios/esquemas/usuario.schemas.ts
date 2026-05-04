import { z } from "zod";

export const usuarioSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
});

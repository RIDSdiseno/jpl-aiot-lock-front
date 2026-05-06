import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
  captcha: z.string().min(1),
});

export type LoginFormulario = z.infer<typeof loginSchema>;

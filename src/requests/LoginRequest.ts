import { Request } from 'express';
import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// TypeScript type inferred from Zod schema
type LoginSchemaType = z.infer<typeof loginSchema>;

// Ensuring the interface matches the schema type
export interface LoginRequest extends Request {
  body: LoginSchemaType;
}

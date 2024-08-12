import { Request } from 'express';
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// TypeScript type inferred from Zod schema
type RegisterSchemaType = z.infer<typeof registerSchema>;

// Ensuring the interface matches the schema type
export interface RegisterRequest extends Request {
  body: RegisterSchemaType;
}
